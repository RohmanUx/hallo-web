import prisma from '../prisma';
import { sendEmail } from '../utils/emailResetPass';
import { hashPassword } from '../utils/hash';
import { createToken } from '../utils/jwt';
import { generateRandomId } from '../utils/randomGenerator';
import { compareSync } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, confirmPassword, refCode, role } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists. Please choose another email.',
        });
      }

      const referralCode = uuidv4().substring(0, 8);
      const identificationId = generateRandomId();

      if (refCode) {
        const referrer = await prisma.user.findFirst({
          where: { referralCode: refCode },
        });

        if (referrer) {
          const updatedPoints = Math.round(Number(referrer.points) + 10000);
          const validTo = new Date(
            Date.now() + 3 * 30 * 24 * 60 * 60 * 1000,
          ).toISOString();
          const discountCode = generateRandomId();

          await prisma.point.create({
            data: {
              userId: referrer.id,
              amount: 10000,
              validFrom: new Date().toISOString(),
              validTo,
            },
          });

          await prisma.discountcode.create({
            data: {
              code: discountCode,
              amount: 5000,
              validFrom: new Date().toISOString(),
              validTo,
              codeStatus: 'AVAILABLE',
              limit: 1,
            },
          });
        }
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          password: await hashPassword(password),
          identificationId,
          referralCode,
          referredBy: refCode
            ? (
                await prisma.user.findFirst({
                  where: { referralCode: refCode },
                })
              )?.id
            : null,
          role,
          balance: 0,
        },
      });

      const token = createToken(
        { id: newUser.id, email: newUser.email },
        '24h',
      );

      return res.status(201).json({
        success: true,
        message: 'Your account has been created.',
        result: {
          email: newUser.email,
          token,
          identificationId,
          referralCode,
        },
      });
    } catch (error) {
      console.error(error);
      next({
        success: false,
        message: 'Failed to register.',
      });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      // Log incoming email and request (you may remove this in production)
      console.log('Login attempt with email:', email);

      // Find user by email
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        // Count the number of events associated with the user
        const totalEvent = await prisma.event.count({
          where: {
            userId: user.id, // Assuming `userId` is the foreign key in the `event` table
          },
        });
      }
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }

      // Compare password with stored hash
      const isPasswordValid = compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }

      // Create JWT token
      let token;
      try {
        token = createToken({ id: user.id, email: user.email }, '24h');
      } catch (tokenError) {
        console.error('Token generation error:', tokenError);
        return res.status(500).json({
          success: false,
          message: 'Failed to generate token.',
        });
      }

      // Success response
      return res.status(200).json({
        success: true,
        result: {
          role: user.role,
          id: user.id,
          identificationId: user.identificationId,
          email: user.email,
          points: user.points,
          token,
        },
      });
    } catch (error) {
      console.error('Login error:', error); // Log the full error for debugging
      return res.status(500).json({
        success: false,
        message: 'Failed to login.',
        error: error,
      });
    }
  }

  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.decrypt.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          userprofile: true,
          //   images: true,
        },
      });

      const profile = await prisma.userprofile.findFirst({
        where: { userId, images: { } },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Account not found.',
        });
      }

      const token = createToken({ id: user.id, email: user.email }, '24h');

      return res.status(200).json({
        success: true,
        result: {
          email: user.email,
          identificationId: user.identificationId,
          role: user.role,
          points: user.points,
          balance: user.balance,
          //   images: user.images,
          token,
        },
      });
    } catch (error) {
      console.error(error);
      next({ success: false, message: 'Failed to fetch user data.' });
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Account not found.',
        });
      }

      const token = createToken({ id: user.id, email: user.email }, '20m');
      await sendEmail(user.email, 'Password Reset', null, {
        email: user.email,
        token,
      });

      return res.status(200).json({
        success: true,
        message: 'Password reset email sent.',
        result: { token },
      });
    } catch (error) {
      console.error(error);
      next({
        success: false,
        message: 'Failed to send password reset email.',
        error,
      });
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { password } = req.body;

      if (!res.locals.decrypt.id) {
        return res.status(400).json({
          success: false,
          message: 'Invalid token.',
        });
      }

      await prisma.user.update({
        where: { id: res.locals.decrypt.id },
        data: { password: await hashPassword(password) },
      });

      return res.status(200).json({
        success: true,
        message: 'Password reset successfully. Please login.',
      });
    } catch (error) {
      console.error(error);
      next({ success: false, message: 'Failed to reset password.', error });
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // Optionally implement token blacklist logic here

      return res.status(200).json({
        success: true,
        message: 'Logged out successfully.',
      });
    } catch (error) {
      console.error(error);
      next({ success: false, message: 'Failed to logout.', error });
    }
  }
}
