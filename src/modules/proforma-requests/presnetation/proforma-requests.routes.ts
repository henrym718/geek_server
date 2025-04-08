import { Router } from "express";
import { ProformaRequestsController } from "./proforma-requests.controller";
import { authenticate } from "@Common/middlewares/authenticate";
import { checkRoles } from "@Common/middlewares/checkRoles";
import { RoleEnum } from "@Core/value-objects";
import { ContainerBootstrap, IDENTIFIERS } from "@Bootstraps/container.bootstrap";

export function configureProformaRequestRoutes(): Router {
    const proformarequestRoutes = Router();
    const proformaRequestController = ContainerBootstrap.getModuleContainer(IDENTIFIERS.ProformaRequest).get(ProformaRequestsController);

    proformarequestRoutes.post("/", authenticate, checkRoles(RoleEnum.CLIENT), proformaRequestController.create);
    proformarequestRoutes.delete("/", authenticate, checkRoles(RoleEnum.CLIENT), proformaRequestController.canceledByClient);
    proformarequestRoutes.get("/client", authenticate, checkRoles(RoleEnum.CLIENT), proformaRequestController.getAllByClient);
    proformarequestRoutes.get("/vendor/:profileid", authenticate, checkRoles(RoleEnum.VENDOR), proformaRequestController.getAllByVendorProfile);

    return proformarequestRoutes;
}
