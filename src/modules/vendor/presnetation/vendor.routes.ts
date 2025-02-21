import { Router } from "express";
import { vendorContainer } from "@Vendor/infraestructure/container/vendor.container";
import { VendorController } from "./vendor.controller";

const vendorcontroller = vendorContainer.get(VendorController);

export const vendorRoutes = Router();

vendorRoutes.post("/create", vendorcontroller.createVendor);
