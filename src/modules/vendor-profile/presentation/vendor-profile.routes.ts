import { Router } from "express";
import { vendorProfileContainer } from "@VendorProfile/infraestructure/container/vendor-profile.container";
import { VendorProfileController } from "./vendor-profile.controller";
import { authenticate } from "@Common/middlewares/authenticate";
import { checkRoles } from "@Common/middlewares/checkRoles";
import { RoleEnum } from "@Core/value-objects";

export const vendorProfileRoutes = Router();
const vendorProfileController = vendorProfileContainer.get(VendorProfileController);

vendorProfileRoutes.post("/", authenticate, checkRoles(RoleEnum.VENDOR), vendorProfileController.createVendorprofile);
vendorProfileRoutes.get("/", vendorProfileController.searchVendorProfiles);
