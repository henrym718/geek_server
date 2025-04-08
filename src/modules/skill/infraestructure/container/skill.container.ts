import { Container } from "inversify";
import { SKILL_SYMBOLS } from "./skill.symbols";
import { CreateSkillUseCase } from "@Skill/application/use-case/create-skill/create-skill.impl";
import { SkillController } from "modules/skill/presentation/skill.controller";
import { registerControllers, registerUseCases } from "@Common/utils/container-utils";
import { GetSkillsByCategoryIdUseCase } from "@Skill/application/use-case/get-skills-by-categoryId/get-skills-by-categoryId.impl";

export function configureSkillContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    registerUseCases(container, [
        { symbol: SKILL_SYMBOLS.CreateSkill, implementation: CreateSkillUseCase },
        { symbol: SKILL_SYMBOLS.GetSkillsByCategoryId, implementation: GetSkillsByCategoryIdUseCase },
    ]);

    registerControllers(container, [SkillController]);

    return container;
}
