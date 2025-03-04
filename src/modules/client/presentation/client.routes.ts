import { clientContainer } from "@Client/infraestructure/container/clinet.container";
import { Router } from "express";
import { ClientController } from "./client.controller";
import { authenticate } from "@Common/middlewares/authenticate";
import { checkRoles } from "@Common/middlewares/checkRoles";
import { RoleEnum } from "@Core/value-objects";

export const clientRoutes = Router();
const clientController = clientContainer.get(ClientController);

clientRoutes.post("/create", authenticate, checkRoles(RoleEnum.CLIENT), clientController.createClient);
