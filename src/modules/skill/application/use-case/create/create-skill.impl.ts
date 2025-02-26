import { inject, injectable } from "inversify";
import { ISkillRepository } from "../../repositories/skill.repository";
import { ReqCreateSkillDto, ResCreateSkillDto } from "./create-skill.dto";
import { ICreateSkillUseCase } from "./create-skill.use-case";
import { SKILL_SYMBOLS } from "modules/skill/infraestructure/container/skill.symbols";

@injectable()
export class CreateSkillUseCase implements ICreateSkillUseCase {
    constructor(@inject(SKILL_SYMBOLS.SkillRepository) private readonly skillRepository: ISkillRepository) {}

    execute(data: ReqCreateSkillDto): Promise<ResCreateSkillDto> {
        throw new Error("Method not implemented.");
    }
}
