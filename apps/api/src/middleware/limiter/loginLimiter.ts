import { NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many login attempts, please try again later',
  },
  keyGenerator: (req: Request) => req.ip || 'authKey',
});

export const resetLimiterOnSuccess = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const key = req.ip || 'authKey';
  limiter.resetKey(key);
  next();
};
