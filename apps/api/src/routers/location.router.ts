import { Router } from "express";
import { LocationController } from "src/controllers/location.controller";

export class LocationRouter {
    private router: Router
    private locationController: LocationController 
    constructor(){
        this.router = Router()
        this.locationController = new LocationController()
        this.configuration()
    }
    private configuration():void{
        this.router.get('/location/', this.locationController.get)
    } 
    public getRouter(): Router{
        return this.router;
    }
}
