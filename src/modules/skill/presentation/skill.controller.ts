import { NextFunction, Request, Response } from "express";
import { ICreateSkillUseCase } from "../application/use-case/create/create-skill.use-case";
import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateSkillDto } from "../application/use-case/create/create-skill.dto";
import { inject, injectable } from "inversify";
import { SKILL_SYMBOLS } from "../infraestructure/container/skill.symbols";

@injectable()
export class SkillController {
    constructor(@inject(SKILL_SYMBOLS.CreateSkillUseCase) private readonly createSkillUseCase: ICreateSkillUseCase) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqCreateSkillDto = req.body;
            const { detail } = await this.createSkillUseCase.execute(data);
            HttpResponse.success(res, null, detail);
        } catch (error) {
            next(error);
        }
    }
}
