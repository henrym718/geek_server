import { Router } from "express";
import { ClientController } from "./client.controller";
import { authenticate } from "@Common/middlewares/authenticate";
import { checkRoles } from "@Common/middlewares/checkRoles";
import { RoleEnum } from "@Core/value-objects";
import { ContainerBootstrap, IDENTIFIERS } from "@Bootstraps/container.bootstrap";

export function configureClientRoutes(): Router {
    const clientRoutes = Router();
    const clientController = ContainerBootstrap.getModuleContainer(IDENTIFIERS.Client).get(ClientController);

    clientRoutes.post("/create", authenticate, checkRoles(RoleEnum.CLIENT), clientController.createClient);

    return clientRoutes;
}
