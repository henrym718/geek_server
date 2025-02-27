import { Container } from "inversify";
import { ISkillRepository } from "modules/skill/application/repositories/skill.repository";
import { SKILL_SYMBOLS } from "./skill.symbols";
import { SkillPrismaRepository } from "../persistence/skill-prisma.repository";
import { ICreateSkillUseCase } from "modules/skill/application/use-case/create/create-skill.use-case";
import { CreateSkillUseCase } from "modules/skill/application/use-case/create/create-skill.impl";
import { SkillController } from "modules/skill/presentation/skill.controller";
import { sharedContainer } from "@Shared/container/shared.container";
import { categoryContainer } from "@Category/infraestructure/container/category.container";

export const skillContainer = new Container();

skillContainer.parent = sharedContainer;
sharedContainer.parent = categoryContainer;

skillContainer.bind<ISkillRepository>(SKILL_SYMBOLS.SkillRepository).to(SkillPrismaRepository);
skillContainer.bind<ICreateSkillUseCase>(SKILL_SYMBOLS.CreateSkillUseCase).to(CreateSkillUseCase);
skillContainer.bind<SkillController>(SkillController).toSelf();
