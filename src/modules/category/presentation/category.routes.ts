import { Router } from "express";
import { categoryContainer } from "@Category/infraestructure/container/category.container";
import { CategoryController } from "./category.controller";

export const categoryRoutes = Router();
const categoryController = categoryContainer.get(CategoryController);

categoryRoutes.post("/", categoryController.createCategory);
