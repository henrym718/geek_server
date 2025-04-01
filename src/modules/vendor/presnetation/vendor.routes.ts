import { Router } from "express";
import { VendorController } from "./vendor.controller";
import { authenticate } from "@Common/middlewares/authenticate";
import { checkRoles } from "@Common/middlewares/checkRoles";
import { RoleEnum } from "@Core/value-objects";
import { ContainerBootstrap, IDENTIFIERS } from "@Bootstraps/container.bootstrap";

export function configureVendorRoutes(): Router {
    const vendorRoutes = Router();
    const vendorController = ContainerBootstrap.getModuleContainer(IDENTIFIERS.Vendor).get(VendorController);

    vendorRoutes.post("/create", authenticate, checkRoles(RoleEnum.VENDOR), vendorController.createVendor);

    return vendorRoutes;
}
