import { Router } from 'express';
import { DiscountController } from '../../src/controllers/discount.controller';

export class DiscountRouter {
  private router: Router;
  private discountController: DiscountController;

  public constructor() {
    this.router = Router();
    this.discountController = new DiscountController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/discount', this.discountController.createDiscount);
    this.router.get('/discount/:id', this.discountController.readDiscount);
    this.router.put('/discount/:id', this.discountController.updateDiscount);
    this.router.delete('/discount/:id', this.discountController.deleteDiscount);
  }

  public getRouter(): Router {
    return this.router;
  }
}
