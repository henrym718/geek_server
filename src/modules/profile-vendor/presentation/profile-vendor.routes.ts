import { Router } from "express";
import { profileVendorContainer } from "@ProfileVendor/infraestructure/container/profile-vendor.container";
import { ProfileVendorController } from "./profile-vendor.controller";
import { authenticate } from "@Common/middlewares/authenticate";
import { checkRoles } from "@Common/middlewares/checkRoles";
import { RoleEnum } from "@Core/value-objects";

export const profileVendorRoutes = Router();
const profileVendorController = profileVendorContainer.get(ProfileVendorController);

profileVendorRoutes.post("/", authenticate, checkRoles(RoleEnum.VENDOR), profileVendorController.create);
