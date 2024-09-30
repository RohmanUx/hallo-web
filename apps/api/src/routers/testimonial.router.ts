import { Router } from 'express';
import { TestimonialController } from '../controllers/testimonial.controller';

export class TestimonialRouter {
  private router: Router;
  private testimonialController: TestimonialController;

  public constructor() {
    this.router = Router();
    this.testimonialController = new TestimonialController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/testimonial/', this.testimonialController.createTestimonial);
    this.router.get('/testimonial/:eventId', this.testimonialController.readTestimonial);
    this.router.put('/testimonial/:id', this.testimonialController.updateTestimonial);
    this.router.delete('/testimonial/:id', this.testimonialController.deleteTestimonial);
  }

  public getRouter(): Router {
    return this.router;
  }
}



