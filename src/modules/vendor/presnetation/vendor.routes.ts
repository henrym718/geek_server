import { Router } from "express";
import { vendorContainer } from "@Vendor/infraestructure/container/vendor.container";
import { VendorController } from "./vendor.controller";
import { authenticate } from "@Common/middlewares/authenticate";
import { checkRoles } from "@Common/middlewares/checkRoles";
import { RoleEnum } from "@Core/value-objects";

const vendorcontroller = vendorContainer.get(VendorController);

export const vendorRoutes = Router();

vendorRoutes.post("/create", authenticate, checkRoles(RoleEnum.VENDOR), vendorcontroller.createVendor);
