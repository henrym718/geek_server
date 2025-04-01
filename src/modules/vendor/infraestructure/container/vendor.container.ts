import { Container } from "inversify";
import { VENDOR_SYMBOLS } from "./vendor.symbol";
import { CreateVendorUseCase } from "@Vendor/application/use-cases/create-vendor/create-vendor.impl";
import { VendorController } from "@Vendor/presnetation/vendor.controller";
import { registerUseCases, registerControllers } from "@Common/utils/container-utils";

export function createVendorContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    registerUseCases(container, [{ symbol: VENDOR_SYMBOLS.CreateVendor, implementation: CreateVendorUseCase }]);
    registerControllers(container, [VendorController]);

    return container;
}
