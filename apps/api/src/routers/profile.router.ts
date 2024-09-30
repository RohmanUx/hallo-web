import { ProfileController } from '../controllers/profile.controller';
import { uploader } from '../middleware/uploader';
import { verifyToken } from '../middleware/verifyToken';
import { Router } from 'express';

export class ProfileRouter {
  private router: Router;
  private profileController: ProfileController;

  constructor() {
    this.router = Router();
    this.profileController = new ProfileController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      '/profile',
      verifyToken,
      this.profileController.getProfileUser,
    );
    this.router.post(
      '/profile',
      verifyToken,
      uploader('/profile', 'USR').single('img'),
      this.profileController.addProfileUser,
    );
    this.router.patch(
      '/profile',
      verifyToken,
      uploader('/profile', 'USR').single('img'),
      this.profileController.updateProfileUser,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
