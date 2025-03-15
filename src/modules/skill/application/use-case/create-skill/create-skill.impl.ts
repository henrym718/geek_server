import { inject, injectable } from "inversify";
import { ISkillRepository } from "@Skill/application/repositories/skill.repository";
import { ReqCreateSkillDto, ResCreateSkillDto } from "./create-skill.dto";
import { ICreateSkillUseCase } from "./create-skill.use-case";
import { SKILL_SYMBOLS } from "@Skill/infraestructure/container/skill.symbols";
import { ICategoryRepository } from "@Category/application/interfaces/repositories/category.repository";
import { CATEGORY_SYMBOLS } from "@Category/infraestructure/container/category.symbol";
import { HttpException } from "@Common/exceptions/http.exception";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { IdVO, TextVO } from "@Core/value-objects";
import { Skill } from "@Core/entities/skill";

@injectable()
export class CreateSkillUseCase implements ICreateSkillUseCase {
    constructor(
        @inject(SKILL_SYMBOLS.SkillRepository) private readonly skillRepository: ISkillRepository,
        @inject(CATEGORY_SYMBOLS.CategoryRepository) private readonly categoryRepository: ICategoryRepository,
        @inject(SHARED_SYMBOLS.UUIDService) private readonly idService: IUUIDService
    ) {}

    async execute(data: ReqCreateSkillDto): Promise<ResCreateSkillDto> {
        const categoryId = IdVO.create(data.categoryId);
        const skillId = IdVO.create(this.idService.generateUUID());
        const skillName = TextVO.create("name", data.name);

        const catgeoryFound = await this.categoryRepository.findById(categoryId.getValue());
        if (!catgeoryFound) throw HttpException.notFound("Category not found");

        const newSkill = Skill.create({
            id: skillId,
            name: skillName,
            categoryId: categoryId,
        });
        await this.skillRepository.create(newSkill);
        return { detail: "Skill created successfully" };
    }
}
