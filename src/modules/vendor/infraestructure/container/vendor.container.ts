import { Container } from "inversify";
import { VENDOR_SYMBOLS } from "./vendor.symbol";
import { CreateVendorUseCase } from "@Vendor/application/use-cases/create-vendor/create-vendor.impl";
import { VendorController } from "@Vendor/presnetation/vendor.controller";
import { registerUseCases, registerControllers } from "@Common/utils/container-utils";

export function createVendorContainer(rootContainer: Container) {
    registerUseCases(rootContainer, [{ symbol: VENDOR_SYMBOLS.CreateVendor, implementation: CreateVendorUseCase }]);
    registerControllers(rootContainer, [VendorController]);
}
