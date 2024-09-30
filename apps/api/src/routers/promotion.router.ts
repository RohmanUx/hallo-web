import { Router } from 'express';
import { PromotionController } from '../controllers/promotion.contoroller';

export class PromotionRouter {
  private router: Router;
  private promotionController: PromotionController;

  public constructor() {
    this.router = Router();
    this.promotionController = new PromotionController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
  //   this.router.post('/promotion', this.promotionController.createPromotion);
  //   this.router.get('/promotion/:id', this.promotionController.getPromotion);
  //   this.router.put('/promotion/:id', this.promotionController.updatePromotion);
  //   this.router.delete('/promotion/:id', this.promotionController.deletePromotion);
  //   this.router.post('/promotion/apply', this.promotionController.applyPromotion);
  } 
  
  public getRouter(): Router {
    return this.router;
  }
}

