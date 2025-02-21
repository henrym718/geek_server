import { IVendorRepository } from "@Vendor/application/repositories/vendor.repository";
import { Container } from "inversify";
import { VENDOR_SYMBOLS } from "./vendor.symbol";
import { VendorPrismaRepository } from "../persistence/vendor-prisma.repository";
import { ICreateVendorUseCase } from "@Vendor/application/use-cases/create-vendor/create-vendor.use-case";
import { CreateVendorUseCase } from "@Vendor/application/use-cases/create-vendor/create-vendor.impl";
import { VendorController } from "@Vendor/presnetation/vendor.controller";

export const vendorContainer = new Container();

vendorContainer.bind<IVendorRepository>(VENDOR_SYMBOLS.VendorRepository).to(VendorPrismaRepository);
vendorContainer.bind<ICreateVendorUseCase>(VENDOR_SYMBOLS.CreateVendorUseCase).to(CreateVendorUseCase);
vendorContainer.bind<VendorController>(VendorController).toSelf();
