import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";
import { Container } from "inversify";
import { VENDOR_PROFILE_SYMBOLS } from "./vendor-profile.symbols";
import { VendorProfilePrismaRepository } from "../persistence/vendor-profile-prisma.repository";
import { ICreateVendorProfileUseCase } from "@VendorProfile/aplication/use-cases/create-vendor-profile.use-case";
import { CreateVendorProfileUseCase } from "@VendorProfile/aplication/use-cases/create-vendor-profile.impl";
import { VendorProfileController } from "@VendorProfile/presentation/vendor-profile.controller";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { CATEGORY_SYMBOLS } from "@Category/infraestructure/container/category.symbol";
import { VENDOR_SYMBOLS } from "@Vendor/infraestructure/container/vendor.symbol";
import { SKILL_SYMBOLS } from "@Skill/infraestructure/container/skill.symbols";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { UUIDServiceImpl } from "@Shared/services/uuid/uuid.service.impl";
import { ICategoryRepository } from "@Category/application/interfaces/repositories/category.repository";
import { CategoryPrismaRepository } from "@Category/infraestructure/persistence/category-prisma.repository";
import { ISkillRepository } from "@Skill/application/repositories/skill.repository";
import { SkillPrismaRepository } from "@Skill/infraestructure/persistence/skill-prisma.repository";
import { IVendorRepository } from "@Vendor/application/repositories/vendor.repository";
import { VendorPrismaRepository } from "@Vendor/infraestructure/persistence/vendor-prisma.repository";

export const vendorProfileContainer = new Container();

vendorProfileContainer.bind<IVendorProfilesRepository>(VENDOR_PROFILE_SYMBOLS.VendorProfileRepository).to(VendorProfilePrismaRepository);
vendorProfileContainer.bind<IUUIDService>(SHARED_SYMBOLS.UUIDService).to(UUIDServiceImpl).inSingletonScope();
vendorProfileContainer.bind<ICategoryRepository>(CATEGORY_SYMBOLS.CategoryRepository).to(CategoryPrismaRepository).inSingletonScope();
vendorProfileContainer.bind<ISkillRepository>(SKILL_SYMBOLS.SkillRepository).to(SkillPrismaRepository).inSingletonScope();
vendorProfileContainer.bind<IVendorRepository>(VENDOR_SYMBOLS.VendorRepository).to(VendorPrismaRepository).inSingletonScope();
vendorProfileContainer.bind<ICreateVendorProfileUseCase>(VENDOR_PROFILE_SYMBOLS.CreateVendorProfileUseCase).to(CreateVendorProfileUseCase);
vendorProfileContainer.bind<VendorProfileController>(VendorProfileController).toSelf();
