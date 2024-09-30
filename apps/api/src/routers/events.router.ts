import { EventController } from '../controllers/events.controller';
import { uploader } from '../middleware/uploader';
import { verifyToken } from '../middleware/verifyToken';
import { Router } from 'express';

export class EventRouter {
  private router: Router;
  private eventController: EventController;

  constructor() {
    this.router = Router();
    this.eventController = new EventController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    //Used bind to ensure that "this" inside getEvent, addEvent, and updateEvent points to the EventController instance.
    //When you pass a method as a callback, "this" value may get lost.
    //Using .bind(this.eventController) ensures that the method retains the correct this context when it's called by Express.
    
    // this.router.get(
    //   '/user-event', 
    //   verifyToken,
    //   this.eventController.getUserEvent.bind(this.eventController), 
    // );
    this.router.get('/events-users/', verifyToken, this.eventController.getEventByAdmin);
    this.router.get('/events-all/:eventId', this.eventController.getAllEvents); 
    this.router.get('/events-id/:eventId', this.eventController.getEvent); 
    this.router.post(
      '/events-post',
      verifyToken,
      uploader('/product', 'EVE').array('eve', 3),
      this.eventController.addEvent.bind(this.eventController),
    );
    this.router.patch(
      '/events-update/:eventId',
      verifyToken,
      uploader('/product', 'EVE').array('eve', 3),
      this.eventController.updateEvent.bind(this.eventController),
    );

        this.router.delete(
      '/events-delete/:eventId',
      verifyToken,
      this.eventController.deleteEvent,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

