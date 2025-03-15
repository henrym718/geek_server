import { Container } from "inversify";
import { ISkillRepository } from "modules/skill/application/repositories/skill.repository";
import { SKILL_SYMBOLS } from "./skill.symbols";
import { SkillPrismaRepository } from "../persistence/skill-prisma.repository";
import { ICreateSkillUseCase } from "@Skill/application/use-case/create-skill/create-skill.use-case";
import { CreateSkillUseCase } from "@Skill/application/use-case/create-skill/create-skill.impl";
import { SkillController } from "modules/skill/presentation/skill.controller";
import { sharedContainer } from "@Shared/container/shared.container";
import { categoryContainer } from "@Category/infraestructure/container/category.container";
import { ISearchSkillsSuggestionsUseCase } from "@Skill/application/use-case/search-skills-suggestions/search-skills-suggestions.use-case";
import { SearchSkillsSuggestionsUseCase } from "@Skill/application/use-case/search-skills-suggestions/search-skills-suggestions.imple";

export const skillContainer = new Container();

skillContainer.parent = sharedContainer;
sharedContainer.parent = categoryContainer;

skillContainer.bind<ISkillRepository>(SKILL_SYMBOLS.SkillRepository).to(SkillPrismaRepository);
skillContainer.bind<ICreateSkillUseCase>(SKILL_SYMBOLS.CreateSkill).to(CreateSkillUseCase);
skillContainer.bind<ISearchSkillsSuggestionsUseCase>(SKILL_SYMBOLS.SearchSkillsSuggestions).to(SearchSkillsSuggestionsUseCase);
skillContainer.bind<SkillController>(SkillController).toSelf();
