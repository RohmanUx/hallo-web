import prisma from '../../prisma';
import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const registerValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('format email is wrong'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    })
    .withMessage(
      'Password must contain minimum 8 characters, at least one uppercase, one lowercase, one number',
    )
    .custom(async (email) => {
      const findExistedEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (findExistedEmail) {
        throw new Error('Email is already in use');
      }
      return true;
    }),
  body('confirmPassword')
    .notEmpty()
    .withMessage('confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('confirm password does not match password');
      }

      return true;
    }),

  body('role').notEmpty().withMessage('please choose a role'),

  (req: Request, res: Response, next: NextFunction) => {
    const errorValidator = validationResult(req);
    if (!errorValidator.isEmpty()) {
      return res.status(400).send({
        success: false,
        error: errorValidator,
      });
    }
    next();
  },
];
