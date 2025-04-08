import { NextFunction, Request, Response } from "express";
import { ICreateSkillUseCase } from "@Skill/application/use-case/create-skill/create-skill.use-case";
import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateSkillDto } from "@Skill/application/use-case/create-skill/create-skill.dto";
import { inject, injectable } from "inversify";
import { SKILL_SYMBOLS } from "../infraestructure/container/skill.symbols";
import { IGetSkillsByCategoryIdUseCase } from "@Skill/application/use-case/get-skills-by-categoryId/get-skills-by-categoryId.use-case";
import { GetSkillsByCategoryIdRequest } from "@Skill/application/use-case/get-skills-by-categoryId/get-skills-by-categoryId.dto";
@injectable()
export class SkillController {
    constructor(
        @inject(SKILL_SYMBOLS.CreateSkill) private readonly createSkillUseCase: ICreateSkillUseCase,
        @inject(SKILL_SYMBOLS.GetSkillsByCategoryId) private readonly getSkillsByCategoryIdUseCase: IGetSkillsByCategoryIdUseCase
    ) {
        this.createSkill = this.createSkill.bind(this);
        this.getSkillsByCategoryId = this.getSkillsByCategoryId.bind(this);
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

    async getSkillsByCategoryId(req: Request, res: Response, next: NextFunction) {
        try {
            const data: GetSkillsByCategoryIdRequest = {
                categoryId: req.params.categoryId,
            };
            const response = await this.getSkillsByCategoryIdUseCase.execute(data);
            HttpResponse.success(res, response);
        } catch (error) {
            next(error);
        }
    }
}
