import { Router } from "express";
import { proformaResponseContainer } from "../infraestructure/container/proforma-reponse.container";
import { ProformaReponseController } from "./proforma-reponse.controller";
import { authenticate } from "@Common/middlewares/authenticate";
import { checkRoles } from "@Common/middlewares/checkRoles";
import { RoleEnum } from "@Core/value-objects";

export const proformaResponseRoutes = Router();
const proformaResponseController = proformaResponseContainer.get(ProformaReponseController);

proformaResponseRoutes.post("/", authenticate, checkRoles(RoleEnum.VENDOR), proformaResponseController.createProformaResponse);
proformaResponseRoutes.get("/:requestid", authenticate, checkRoles(RoleEnum.CLIENT), proformaResponseController.getpPoformaResponsesByRequestId);
