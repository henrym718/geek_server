import { clientContainer } from "@Client/infraestructure/container/clinet.container";
import { Router } from "express";
import { ClientController } from "./client.controller";

export const clientRoutes = Router();
const clientController = clientContainer.get(ClientController);

clientRoutes.post("/create", clientController.createClient);
