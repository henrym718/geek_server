import { Container } from "inversify";
import { SKILL_SYMBOLS } from "./skill.symbols";
import { CreateSkillUseCase } from "modules/admin/skill/application/use-case/create-skill/create-skill.impl";
import { SkillController } from "modules/admin/skill/presentation/skill.controller";
import { registerControllers, registerUseCases } from "@Common/utils/container-utils";
import { GetSkillsByCategoryIdUseCase } from "modules/admin/skill/application/use-case/get-skills-by-categoryId/get-skills-by-categoryId.impl";

export function configureSkillContainer(rootContainer: Container) {
    registerUseCases(rootContainer, [
        { symbol: SKILL_SYMBOLS.CreateSkill, implementation: CreateSkillUseCase },
        { symbol: SKILL_SYMBOLS.GetSkillsByCategoryId, implementation: GetSkillsByCategoryIdUseCase },
    ]);

    registerControllers(rootContainer, [SkillController]);
}
