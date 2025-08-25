import { GetSkillsByCategoryIdRequest, GetSkillsByCategoryIdResponse } from "./get-skills-by-categoryId.dto";

export interface IGetSkillsByCategoryIdUseCase {
    execute(request: GetSkillsByCategoryIdRequest): Promise<GetSkillsByCategoryIdResponse[]>;
}
