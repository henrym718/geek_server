import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateCategoryDTO } from "@Group/application/dtos/req-create-category.dto";
import { ICreateGroupUseCase } from "@Group/application/interfaces/use-cases/create-group.use-case";
import { GROUP_SYMBOLS } from "@Group/infraestructure/container/group.symbol";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class GroupController {
    constructor(@inject(GROUP_SYMBOLS.CreateGroupUseCase) private readonly createGroupUseCase: ICreateGroupUseCase) {
        this.createGroup = this.createGroup.bind(this);
    }

    async createGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqCreateCategoryDTO = req.body;
            await this.createGroupUseCase.execute(data);
            HttpResponse.success(res, null, "Rgeistro creado correctamente");
        } catch (error) {
            next(error);
        }
    }
}
