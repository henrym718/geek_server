import { IdVO, TextVO } from "@Core/value-objects";
import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";
import { ReqCreateVendorProfileDto, ResCreateVendorProfileDto } from "./create-vendor-profile.dto";
import { ICreateVendorProfileUseCase } from "./create-vendor-profile.use-case";
import { VendorProfile } from "@Core/entities/profile-vendor";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { ICategoryRepository } from "@Category/application/interfaces/repositories/category.repository";
import { IVendorRepository } from "@Vendor/application/repositories/vendor.repository";
import { ISkillRepository } from "@Skill/application/repositories/skill.repository";
import { inject, injectable } from "inversify";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";

@injectable()
export class CreateVendorProfileUseCase implements ICreateVendorProfileUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.VendorProfileRepository) private readonly vendorProfileRepository: IVendorProfilesRepository,
        @inject(SHARED_SYMBOLS.UUIDService) private readonly idSaervice: IUUIDService,
        @inject(SHARED_SYMBOLS.CategoryRepository) private readonly categoryRepository: ICategoryRepository,
        @inject(SHARED_SYMBOLS.VendorRepository) private readonly vendorRepository: IVendorRepository,
        @inject(SHARED_SYMBOLS.SkillRepository) private readonly skillRepository: ISkillRepository
    ) {}

    async execute(data: ReqCreateVendorProfileDto): Promise<ResCreateVendorProfileDto> {
        const { aboutme, skills, title, categoryId, vendorId } = data;

        const aboutmeVO = TextVO.create(aboutme, "aboutme");
        const titleVO = TextVO.create(title, "title");
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
            title: titleVO,
            skills: skillsVO,
            categoryId: categoryIdVO,
            vendorId: vendorIdVO,
        });

        await this.vendorProfileRepository.create(newProfileVendor);

        return { detail: "Profile Vendor created" };
    }
}
