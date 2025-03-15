import { NextFunction, Request, Response } from "express";
import { ICreateSkillUseCase } from "@Skill/application/use-case/create-skill/create-skill.use-case";
import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateSkillDto } from "@Skill/application/use-case/create-skill/create-skill.dto";
import { inject, injectable } from "inversify";
import { SKILL_SYMBOLS } from "../infraestructure/container/skill.symbols";
import { ISearchSkillsSuggestionsUseCase } from "@Skill/application/use-case/search-skills-suggestions/search-skills-suggestions.use-case";
import { SearchSkillsRequest } from "@Skill/application/use-case/search-skills-suggestions/search-skills-suggestions.dto";

@injectable()
export class SkillController {
    constructor(
        @inject(SKILL_SYMBOLS.CreateSkill)
        private readonly createSkillUseCase: ICreateSkillUseCase,

        @inject(SKILL_SYMBOLS.SearchSkillsSuggestions)
        private readonly searchSkillsSuggestionsUseCase: ISearchSkillsSuggestionsUseCase
    ) {
        this.createSkill = this.createSkill.bind(this);
        this.searchSkillsSuggestions = this.searchSkillsSuggestions.bind(this);
    }

    async createSkill(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqCreateSkillDto = req.body;
            const { detail } = await this.createSkillUseCase.execute(data);
            HttpResponse.success(res, null, detail);
        } catch (error) {
            next(error);
        }
    }
    async searchSkillsSuggestions(req: Request, res: Response, next: NextFunction) {
        try {
            const data: SearchSkillsRequest = req.body;
            const response = await this.searchSkillsSuggestionsUseCase.execute(data);
            HttpResponse.success(res, response);
        } catch (error) {
            next(error);
        }
    }
}
