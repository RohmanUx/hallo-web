import {
  limiter,
  resetLimiterOnSuccess,
} from '../middleware/limiter/loginLimiter';
import { AuthController } from '../controllers/auth.controller';
import { forgotPassValidation } from '../middleware/validator/forgotPassword';
import { loginValidation } from '../middleware/validator/login';
import { registerValidation } from '../middleware/validator/register';
import { resetPassValidation } from '../middleware/validator/resetPassword';
import { verifyToken } from '../middleware/verifyToken';
import { Router } from 'express';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes ( ) : void {
    this.router.post(
      '/login',
      loginValidation,
      limiter,
      resetLimiterOnSuccess,
      this.authController.login,
    );
    this.router.get('/keeplogin', verifyToken, this.authController.keepLogin);
    this.router.post(
      '/forgot-password',
      forgotPassValidation,
      this.authController.forgotPassword,
    );
    this.router.patch(
      '/reset-password',
      resetPassValidation,
      verifyToken,
      this.authController.resetPassword,
    );
    this.router.post(
      '/register',
      // registerValidation,
      this.authController.register,
    );
    this.router.post('/logout', this.authController.logout);
  }
  getRouter(): Router {
    return this.router;
  }
} 