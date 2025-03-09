import { Router } from "express";
import { proformaRequestsContainer } from "@ProformaRequests/infraestructure/container/proforma-requests.container";
import { ProformaRequestsController } from "./proforma-requests.controller";
import { authenticate } from "@Common/middlewares/authenticate";
import { checkRoles } from "@Common/middlewares/checkRoles";
import { RoleEnum } from "@Core/value-objects";

export const proformarequestRoutes = Router();
const proformaRequestController = proformaRequestsContainer.get(ProformaRequestsController);

proformarequestRoutes.post("/", authenticate, checkRoles(RoleEnum.CLIENT), proformaRequestController.create);
proformarequestRoutes.get("/", authenticate, checkRoles(RoleEnum.CLIENT), proformaRequestController.getProformaRequests);
