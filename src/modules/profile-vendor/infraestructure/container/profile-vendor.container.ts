import { IProfileVendorRepository } from "@ProfileVendor/aplication/repositories/profile-vendor.repository";
import { Container } from "inversify";
import { PROFILE_VENDOR_SYMBOLS } from "./profile-vendor.symbols";
import { ProfileVendorPrismaRepository } from "../persistence/profile-vendor-prisma.repository";
import { ICreateProfileVendorUseCase } from "@ProfileVendor/aplication/use-cases/create-profile-vendor.use-case";
import { CreateProfileVendorUseCase } from "@ProfileVendor/aplication/use-cases/create-profile-vendor.impl";
import { ProfileVendorController } from "@ProfileVendor/presentation/profile-vendor.controller";
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

export const profileVendorContainer = new Container();

profileVendorContainer.bind<IProfileVendorRepository>(PROFILE_VENDOR_SYMBOLS.profileVendorRepository).to(ProfileVendorPrismaRepository);
profileVendorContainer.bind<IUUIDService>(SHARED_SYMBOLS.UUIDService).to(UUIDServiceImpl).inSingletonScope();
profileVendorContainer.bind<ICategoryRepository>(CATEGORY_SYMBOLS.CategoryRepository).to(CategoryPrismaRepository).inSingletonScope();
profileVendorContainer.bind<ISkillRepository>(SKILL_SYMBOLS.SkillRepository).to(SkillPrismaRepository).inSingletonScope();
profileVendorContainer.bind<IVendorRepository>(VENDOR_SYMBOLS.VendorRepository).to(VendorPrismaRepository).inSingletonScope();
profileVendorContainer.bind<ICreateProfileVendorUseCase>(PROFILE_VENDOR_SYMBOLS.createProfileVendorUseCase).to(CreateProfileVendorUseCase);
profileVendorContainer.bind<ProfileVendorController>(ProfileVendorController).toSelf();
