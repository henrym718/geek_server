import { Router } from "express";
import { VendorProfileController } from "./vendor-profile.controller";
import { authenticate } from "@Common/middlewares/authenticate";
import { checkRoles } from "@Common/middlewares/checkRoles";
import { RoleEnum } from "@Core/value-objects";
import { ContainerBootstrap, IDENTIFIERS } from "@Bootstraps/container.bootstrap";

export function configureVendorProfileRoutes(): Router {
    const vendorProfileRoutes = Router();
    const vendorProfileController = ContainerBootstrap.getModuleContainer(IDENTIFIERS.VendorProfile).get(VendorProfileController);

    vendorProfileRoutes.post("/", authenticate, checkRoles(RoleEnum.VENDOR), vendorProfileController.createVendorprofile);
    vendorProfileRoutes.get("/", vendorProfileController.searchVendorProfiles);

    return vendorProfileRoutes;
}
