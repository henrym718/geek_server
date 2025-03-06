import { IdVO, TextVO } from "@Core/value-objects";
import { IVendorProfilesRepository } from "../repositories/vendor-profile.repository";
import { ReqCreateVendorProfileDto, ResCreateVendorProfileDto } from "./create-vendor-profile.dto";
import { ICreateVendorProfileUseCase } from "./create-vendor-profile.use-case";
import { VendorProfile } from "@Core/entities/profile-vendor";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { ICategoryRepository } from "@Category/application/interfaces/repositories/category.repository";
import { IVendorRepository } from "@Vendor/application/repositories/vendor.repository";
import { ISkillRepository } from "@Skill/application/repositories/skill.repository";
import { inject, injectable } from "inversify";
import { VENDOR_PROFILE_SYMBOLS } from "@VendorProfile/infraestructure/container/vendor-profile.symbols";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { CATEGORY_SYMBOLS } from "@Category/infraestructure/container/category.symbol";
import { VENDOR_SYMBOLS } from "@Vendor/infraestructure/container/vendor.symbol";
import { SKILL_SYMBOLS } from "@Skill/infraestructure/container/skill.symbols";

@injectable()
export class CreateVendorProfileUseCase implements ICreateVendorProfileUseCase {
    constructor(
        @inject(VENDOR_PROFILE_SYMBOLS.VendorProfileRepository) private readonly vendorProfileRepository: IVendorProfilesRepository,
        @inject(SHARED_SYMBOLS.UUIDService) private readonly idSaervice: IUUIDService,
        @inject(CATEGORY_SYMBOLS.CategoryRepository) private readonly categoryRepository: ICategoryRepository,
        @inject(VENDOR_SYMBOLS.VendorRepository) private readonly vendorRepository: IVendorRepository,
        @inject(SKILL_SYMBOLS.SkillRepository) private readonly skillRepository: ISkillRepository
    ) {}

    async execute(data: ReqCreateVendorProfileDto): Promise<ResCreateVendorProfileDto> {
        const { aboutme, skills, tittle, categoryId, vendorId } = data;

        const aboutmeVO = TextVO.create(aboutme, "aboutme");
        const tittleVO = TextVO.create(tittle, "tittle");
        const skillsVO = skills.map((skill) => IdVO.create(skill));
        const categoryIdVO = IdVO.create(categoryId);
        const vendorIdVO = IdVO.create(vendorId);

        const [skill, category, vendor] = await Promise.all([
            this.skillRepository.findByIds(skillsVO.map((skill) => skill.getValue())),
            this.categoryRepository.findById(categoryIdVO.getValue()),
            this.vendorRepository.findById(vendorIdVO.getValue()),
        ]);

        if (skill.length !== skillsVO.length) throw new Error("Some skills were not found");
        if (!category) throw new Error("Category not found");
        if (!vendor) throw new Error("Vendor not found");

        const newProfileVendor = VendorProfile.create({
            id: IdVO.create(this.idSaervice.generateUUID()),
            aboutme: aboutmeVO,
            tittle: tittleVO,
            skills: skillsVO,
            categoryId: categoryIdVO,
            vendorId: vendorIdVO,
        });

        await this.vendorProfileRepository.create(newProfileVendor);

        return { detail: "Profile Vendor created" };
    }
}
