import { Router } from 'express';
import MidtransController from '../controllers/midtrans.controller';
export class midtransRouter {
  private router: Router;
  private midtransController: MidtransController;
  constructor() {
    this.router = Router();
    this.midtransController = MidtransController();
    this.configutation();
  }
  private configutation(): void {
    this.router.post('/post', this.midtransController.post)
  }

  public(): Router {
    return this.router;
  }
}
