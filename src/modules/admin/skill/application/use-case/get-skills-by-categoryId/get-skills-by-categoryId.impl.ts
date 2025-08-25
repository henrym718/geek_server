import { GetSkillsByCategoryIdRequest, GetSkillsByCategoryIdResponse } from "./get-skills-by-categoryId.dto";
import { IGetSkillsByCategoryIdUseCase } from "./get-skills-by-categoryId.use-case";
import { inject } from "inversify";
import { ISkillRepository } from "modules/admin/skill/application/repositories/skill.repository";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { IdVO } from "@Core/value-objects";

export class GetSkillsByCategoryIdUseCase implements IGetSkillsByCategoryIdUseCase {
    constructor(@inject(SHARED_SYMBOLS.SkillRepository) private readonly skillRepository: ISkillRepository) {}

    async execute(request: GetSkillsByCategoryIdRequest): Promise<GetSkillsByCategoryIdResponse[]> {
        const categoryId = IdVO.create(request.categoryId);
        const skills = await this.skillRepository.getSkillsByCategoryId(categoryId.getValue());

        return skills.map(skill => ({
            id: skill.id.getValue(),
            name: skill.name.getValue(),
        }));
    }
}
