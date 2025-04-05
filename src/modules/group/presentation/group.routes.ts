import { Router } from "express";
import { GroupController } from "./group.controller";
import { ContainerBootstrap, IDENTIFIERS } from "@Bootstraps/container.bootstrap";

export function configureGroupRoutes(): Router {
    const groupRoutes = Router();
    const groupController = ContainerBootstrap.getModuleContainer(IDENTIFIERS.Group).get(GroupController);

    groupRoutes.get("/", groupController.getAllGroups);
    groupRoutes.post("/", groupController.createGroup);
    groupRoutes.put("/", groupController.updateGroup);
    groupRoutes.get("/:id", groupController.getGroupWithCategories);

    return groupRoutes;
}
