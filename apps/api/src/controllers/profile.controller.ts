import prisma from '../prisma';
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export class ProfileController {
  async getProfileUser(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(res.locals.decrypt.id);

      if (res.locals.decrypt.id) {
        const findUser = await prisma.userprofile.findFirst({
          where: {
            userId: res.locals.decrypt.id,
          },
        });

        if (!findUser) {
          console.log('USER:', findUser);

          return res.status(404).send({
            success: false,
            message: 'User not found',
          });
        }
      }
      const profile = await prisma.userprofile.findMany({
        where: { userId: res.locals.decrypt.id },
        select: {
          firstName: true,
          lastName: true,
          gender: true,
          address: true,
          phoneNumber: true,
          dateOfBirth: true,
          isAdded: true,
          location: {
            select: {
              locationName: true,
            },
          },
          user: {
            select: {
              email: true,
              points: true,
              identificationId: true,
              balance: true,
              referralCode: true,
            },
          },
          images: true,
        },
      });

      return res.status(200).send({
        success: true,
        result: profile,
      });
    } catch (error) {
      console.log(error);

      next({ success: false, message: 'Failed to get your information' });
    }
    `  `;
  }
  async addProfileUser(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        address,
        dateOfBirth,
        firstName,
        lastName,
        gender,
        location,
        phoneNumber,
      } = req.body;

      console.log(res.locals.decrypt);

      if (res.locals.decrypt.id) {
        const findUser = await prisma.user.findUnique({
          where: {
            id: res.locals.decrypt.id,
          },
        });

        if (!findUser) {
          return res.status(404).send({
            succesS: false,
            message: 'Profile not found',
          });
        }
        const findLocation = await prisma.location.findFirst({
          where: {
            locationName: location,
          },
        });
        const files = req.files as Express.Multer.File[];
        const imagePath =
          files?.map((file) => `/assets/product/${file.filename}`) || [];

        if (findLocation) {
          const createProfile = await prisma.userprofile.create({
            data: {
              userId: findUser.id,
              address,
              dateOfBirth: new Date(dateOfBirth).toISOString(),
              firstName,
              lastName,
              gender,
              phoneNumber,
              isAdded: true,
              // images: `/assets/profile/${req.file?.filename}`,
              images: {
                create: imagePath.length
                  ? imagePath.map((path) => ({ path }))
                  : undefined,
              },

              locationId: findLocation?.id,
            },
          });

          return res.status(200).send({
            success: true,
            message: 'successfully add your profile',
            result: createProfile,
          });
        } else {
          const createLocation = await prisma.location.create({
            data: {
              locationName: location,
            },
          });

          const createProfile = await prisma.userprofile.create({
            data: {
              userId: findUser.id,
              address: address,
              dateOfBirth: new Date(dateOfBirth).toISOString(),
              firstName,
              lastName,
              phoneNumber,
              gender,
              // images: `/assets/profile/${req.file?.filename}`,
              images: {
                create: imagePath.length
                  ? imagePath.map((path) => ({ path }))
                  : undefined,
              },

              isAdded: true,
              locationId: createLocation.id,
            },
          });

          return res.status(200).send({
            success: true,
            message: 'successfully add your profile',
            result: createProfile,
          });
        }
      } else {
        return res.status(404).send({
          success: false,
          message: 'Token not found',
          result: res.locals.decrypt.id,
        });
      }
    } catch (error) {
      console.log(error);

      return res.status(500).send({
        success: false,
        message: error,
      });
    }
  }
  async updateProfileUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (res.locals.decrypt.id) {
        const {
          address,
          firstName,
          lastName,
          gender,
          dateOfBirth,
          phoneNumber,
          image,
        } = req.body;

        const findUser = await prisma.userprofile.findFirst({
          where: {
            userId: res.locals.decrypt.id,
          },
        });
        // If the user profile is not found, return an error
        if (!findUser) {
          return res.status(404).send({
            success: false,
            message: 'User profile not found',
          });
        }

        // if (findUser.images) {
        //   const oldImagePath = path.join(
        //     __dirname,
        //     '../../public',
        //     findUser.images,
        //   );
        //   if (fs.existsSync(oldImagePath)) {
        //     fs.unlinkSync(oldImagePath);
        //   }
        // }
        // if (findUser?.images?.length > 0) {
        //   findUser.images.forEach((image) => {
        //     const oldImagePath = path.join(__dirname, '../../public', image.path);
        //     if (fs.existsSync(oldImagePath)) {
        //       fs.unlinkSync(oldImagePath);
        //     }
        //   });

        // Handle file uploads
        const files = req.files as Express.Multer.File[];
        const imagePaths =
          files?.map((file) => `/assets/product/${file.filename}`) || [];

        const updatedProfile = await prisma.userprofile.update({
          data: {
            address: address ? address : findUser?.address,
            firstName: firstName ? firstName : findUser?.firstName,
            lastName: lastName ? lastName : findUser?.lastName,
            gender: gender ? gender : findUser?.gender,
            phoneNumber: phoneNumber ? phoneNumber : findUser?.phoneNumber,
            dateOfBirth: dateOfBirth
              ? new Date(dateOfBirth).toISOString()
              : findUser?.dateOfBirth,
            // images: { create: imagePaths.map((path) => ({ path })) },
             images: {
              updateMany: imagePaths.map((path) => ({
                where: { id: image }, // Specify the condition for which images to update
                data: { path }, // Update the path with the new one
              })),
            },
        
            // use if string
            //   // Assuming `image` is a one-to-many relationship with an Image table
            //   images: imagePaths.length 
            //             images: {
            //   create: imagePaths.length
            //     ? imagePaths.map((path) => ({ path }))
            //     : undefined,
            // },
            // },
          },

          where: {
            id: findUser?.id,
          },
        });
        console.log(updatedProfile);
        return res.status(200).send({
          success: false,
          message: 'Profile updated succesfully',
          result: updatedProfile,
        });
      }
    } catch (error) {
      next({
        success: false,
        message: 'Cannot update your profile',
        error,
      });
    }
  }
}
