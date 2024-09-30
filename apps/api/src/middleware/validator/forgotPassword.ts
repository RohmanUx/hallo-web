import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

export const forgotPassValidation = [
  body('email').notEmpty().withMessage('Please provide your email'),
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
  