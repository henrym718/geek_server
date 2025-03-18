import { NextFunction, Request, Response } from "express";
import { ICreateSkillUseCase } from "@Skill/application/use-case/create-skill/create-skill.use-case";
import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateSkillDto } from "@Skill/application/use-case/create-skill/create-skill.dto";
import { inject, injectable } from "inversify";
import { SKILL_SYMBOLS } from "../infraestructure/container/skill.symbols";
@injectable()
export class SkillController {
    constructor(
        @inject(SKILL_SYMBOLS.CreateSkill)
        private readonly createSkillUseCase: ICreateSkillUseCase
    ) {
        this.createSkill = this.createSkill.bind(this);
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
}
