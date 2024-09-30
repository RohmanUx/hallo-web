import { CategoryController } from "../controllers/category.controller";
import { Router } from "express";
export class CategoryRouter { 
  private categoryConteroller : CategoryController
  private router: Router;

  constructor() { 
    this.categoryConteroller = new CategoryController 
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/categories", this.categoryConteroller.createCategory);
    this.router.get("/categories", this.categoryConteroller.getCategories);
    this.router.get("/categories/:id", this.categoryConteroller.getCategoryById);
    this.router.put("/categories/:id", this.categoryConteroller.updateCategory);
    this.router.delete("/categories/:id", this.categoryConteroller.deleteCategory);
  }

  public getRouter() {
    return this.router;
  }
  }

