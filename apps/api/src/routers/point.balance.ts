import { verifyToken } from 'src/middleware/verifyToken';
import { PointBalanceController } from '../controllers/poin.balance';
import { Router } from 'express' ; 

export class PointBalanceRouter {
  private router: Router;
  private pointBalanceController: PointBalanceController;

  public constructor() {
    this.router = Router();
    this.pointBalanceController = new PointBalanceController();
    this.initializeRoutes();
  }
  
  private initializeRoutes(): void {
    this.router.put('/user/:userId/', this.pointBalanceController.updateBalance); 
        this.router.get('/user/:userId/', this.pointBalanceController.getBalance);
        this.router.post('/user/', verifyToken,
           this.pointBalanceController.createBalance);
  }

  public getRouter(): Router {
    return this.router;
  }
}
