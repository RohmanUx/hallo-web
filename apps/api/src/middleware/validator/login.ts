import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('format email is wrong'),
  body('password').notEmpty().withMessage('password is required'),
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
