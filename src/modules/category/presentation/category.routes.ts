import { Router } from "express";
import { CategoryController } from "./category.controller";
import { ContainerBootstrap, IDENTIFIERS } from "@Bootstraps/container.bootstrap";

export function configureCategoryRoutes(): Router {
    const categoryRoutes = Router();
    const categoryController = ContainerBootstrap.getModuleContainer(IDENTIFIERS.Category).get(CategoryController);

    categoryRoutes.post("/", categoryController.createCategory);
    categoryRoutes.get("/", categoryController.getCategoriesByGroupId);

    return categoryRoutes;
}
