import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateGroupDTO } from "@Group/application/dtos/req-create-group.dto";
import { ReqUpdateGroupDTO } from "@Group/application/dtos/req-update-group.dto.";
import { ICreateGroupUseCase } from "@Group/application/interfaces/use-cases/create-group.use-case";
import { GROUP_SYMBOLS } from "@Group/infraestructure/container/group.symbol";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class GroupController {
    constructor(
        @inject(GROUP_SYMBOLS.CreateGroupUseCase) private readonly createGroupUseCase: ICreateGroupUseCase,
        @inject(GROUP_SYMBOLS.UpdateGroupUseCase) private readonly updateGroupUseCase: ICreateGroupUseCase
    ) {
        this.createGroup = this.createGroup.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
    }

    async createGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqCreateGroupDTO = req.body;
            await this.createGroupUseCase.execute(data);
            HttpResponse.success(res, null, "Rgeistro creado correctamente");
        } catch (error) {
            next(error);
        }
    }

    async updateGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqUpdateGroupDTO = req.body;
            await this.updateGroupUseCase.execute(data);
            HttpResponse.success(res, null, "Rgeistro actualizado correctamente");
        } catch (error) {
            next(error);
        }
    }
}
