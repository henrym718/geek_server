import { Router } from "express";
import { ProformaReponseController } from "./proforma-reponse.controller";
import { authenticate } from "@Common/middlewares/authenticate";
import { checkRoles } from "@Common/middlewares/checkRoles";
import { RoleEnum } from "@Core/value-objects";
import { ContainerBootstrap, IDENTIFIERS } from "@Bootstraps/container.bootstrap";

export function configureProformaResponseRoutes(): Router {
    const proformaResponseRoutes = Router();
    const proformaResponseController = ContainerBootstrap.getModuleContainer(IDENTIFIERS.ProformaResponse).get(ProformaReponseController);

    proformaResponseRoutes.post("/", authenticate, checkRoles(RoleEnum.VENDOR), proformaResponseController.create);
    proformaResponseRoutes.get("/:requestid", authenticate, checkRoles(RoleEnum.CLIENT), proformaResponseController.getAllByRequestId);
    proformaResponseRoutes.put("/", authenticate, checkRoles(RoleEnum.CLIENT), proformaResponseController.updateStatusByClient);

    return proformaResponseRoutes;
}
