import { Router } from "express";
import { LocationsController } from "../controllers/locations.controller";

export class LocationsRouter {
    private router: Router
    private locationController: LocationsController 
    constructor(){
        this.router = Router()
        this.locationController = new LocationsController()
        this.configuration()
    }
    private configuration():void{
        this.router.get('/location/', this.locationController.get)
    } 
    public getRouter(): Router{
        return this.router;
    }
}
