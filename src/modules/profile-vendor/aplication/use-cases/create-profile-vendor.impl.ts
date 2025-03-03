import { IdVO, TextVO } from "@Core/value-objects";
import { IProfileVendorRepository } from "../repositories/profile-vendor.repository";
import { ReqCreateProfileVendorDto, ResCreateProfileVendorDto } from "./create-profile-vendor.dto";
import { ICreateProfileVendorUseCase } from "./create-profile-vendor.use-case";
import { ProfileVendor } from "@Core/entities/profile-vendor";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { ICategoryRepository } from "@Category/application/interfaces/repositories/category.repository";
import { IVendorRepository } from "@Vendor/application/repositories/vendor.repository";
import { ISkillRepository } from "@Skill/application/repositories/skill.repository";
import { inject, injectable } from "inversify";
import { PROFILE_VENDOR_SYMBOLS } from "@ProfileVendor/infraestructure/container/profile-vendor.symbols";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { CATEGORY_SYMBOLS } from "@Category/infraestructure/container/category.symbol";
import { VENDOR_SYMBOLS } from "@Vendor/infraestructure/container/vendor.symbol";
import { SKILL_SYMBOLS } from "@Skill/infraestructure/container/skill.symbols";

@injectable()
export class CreateProfileVendorUseCase implements ICreateProfileVendorUseCase {
    constructor(
        @inject(PROFILE_VENDOR_SYMBOLS.profileVendorRepository) private readonly profileVendorRepository: IProfileVendorRepository,
        @inject(SHARED_SYMBOLS.UUIDService) private readonly idSaervice: IUUIDService,
        @inject(CATEGORY_SYMBOLS.CategoryRepository) private readonly categoryRepository: ICategoryRepository,
        @inject(VENDOR_SYMBOLS.VendorRepository) private readonly vendorRepository: IVendorRepository,
        @inject(SKILL_SYMBOLS.SkillRepository) private readonly skillRepository: ISkillRepository
    ) {}

    async execute(data: ReqCreateProfileVendorDto): Promise<ResCreateProfileVendorDto> {
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

        const newProfileVendor = ProfileVendor.create({
            id: IdVO.create(this.idSaervice.generateUUID()),
            aboutme: aboutmeVO,
            tittle: tittleVO,
            skills: skillsVO,
            categoryId: categoryIdVO,
            vendorId: vendorIdVO,
        });

        await this.profileVendorRepository.create(newProfileVendor);

        return { detail: "Profile Vendor created" };
    }
}
