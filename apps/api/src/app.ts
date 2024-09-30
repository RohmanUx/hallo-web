import dotenv from 'dotenv';
dotenv.config();

import express, {
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  json,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import { ProfileRouter } from './routers/profile.router';
import { EventRouter } from './routers/events.router';
import { TransactionRouter } from './routers/transaction.router';
import { LocationRouter } from './routers/location.router';
import { TestimonialRouter } from './routers/testimonial.router';
import { DiscountRouter } from './routers/discount.route';
import { PromotionRouter } from './routers/promotion.router';
import path from 'path';
import { PointBalanceRouter } from './routers/point.balance';
import { CategoryRouter } from './routers/category.router'; // Import CategoryRouter

export default class App {
  readonly app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/assets', express.static(path.join(__dirname, '../public')));
  }

  private handleError(): void {
    // Handle 404 errors
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found!');
      } else {
        next();
      }
    });

    // Handle 500 errors
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.log('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const authRouter = new AuthRouter();
    const profileRouter = new ProfileRouter();
    const eventRouter = new EventRouter();
    const transactionRouter = new TransactionRouter();
    const testimonialRouter = new TestimonialRouter();
    const discountRouter = new DiscountRouter();
    const balancePointRouter = new PointBalanceRouter();
    const locationRouter = new LocationRouter();
    const promotionRouter = new PromotionRouter();
    const categoryRouter = new CategoryRouter(); // Initialize CategoryRouter

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/user', profileRouter.getRouter());
    this.app.use('/api/event', eventRouter.getRouter());
    this.app.use('/api/transaction', transactionRouter.getRouter());
    this.app.use('/api/testimonial', testimonialRouter.getRouter());
    this.app.use('/api/discount', discountRouter.getRouter());
    this.app.use('/api/balance-point', balancePointRouter.getRouter());
    this.app.use('/api/promotion', promotionRouter.getRouter());
    this.app.use('/api/category', categoryRouter.getRouter()); // Use CategoryRouter
    this.app.use('/api/location', locationRouter.getRouter()); // Use CategoryRouter
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local: http://localhost:${PORT}/`);
    });
  }
}
