import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const resetPassValidation = [
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    })
    .withMessage(
      'Password must contain minimum 8 characters, at least one uppercase, one lowercase, one number',
    ),
  body('confirmPassword')
    .notEmpty()
    .withMessage('confirm your password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('confirm password does not match');
      }
      return true;
    }),
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
