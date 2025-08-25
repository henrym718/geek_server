import { ReqCreateSkillDto, ResCreateSkillDto } from "./create-skill.dto";

export interface ICreateSkillUseCase {
    execute(data: ReqCreateSkillDto): Promise<ResCreateSkillDto>;
}
