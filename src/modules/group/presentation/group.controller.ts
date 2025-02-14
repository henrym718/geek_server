import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateGroupDTO } from "@Group/application/dtos/req-create-group.dto";
import { ReqUpdateGroupDTO } from "@Group/application/dtos/req-update-group.dto.";
import { ICreateGroupUseCase } from "@Group/application/interfaces/use-cases/create-group.use-case";
import { IGroupWithCategoriesUseCase } from "@Group/application/interfaces/use-cases/group-with-categories.use-case";
import { IListGroupsUseCase } from "@Group/application/interfaces/use-cases/list-groups.use-case";
import { IUpdateGroupUseCase } from "@Group/application/interfaces/use-cases/update-group.use-case";
import { GROUP_SYMBOLS } from "@Group/infraestructure/container/group.symbol";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class GroupController {
    constructor(
        @inject(GROUP_SYMBOLS.CreateGroupUseCase) private readonly createGroupUseCase: ICreateGroupUseCase,
        @inject(GROUP_SYMBOLS.UpdateGroupUseCase) private readonly updateGroupUseCase: IUpdateGroupUseCase,
        @inject(GROUP_SYMBOLS.ListGroupUseCase) private readonly ListGroupUseCase: IListGroupsUseCase,
        @inject(GROUP_SYMBOLS.GroupWithCategoriesUseCase) private readonly groupWithCategoriesUseCase: IGroupWithCategoriesUseCase
    ) {
        this.createGroup = this.createGroup.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
        this.ListGroup = this.ListGroup.bind(this);
        this.getGroupWithCategories = this.getGroupWithCategories.bind(this);
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

    async ListGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const groupsFound = await this.ListGroupUseCase.execute();
            HttpResponse.success(res, groupsFound);
        } catch (error) {
            next(error);
        }
    }

    async getGroupWithCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const groupWithCategories = await this.groupWithCategoriesUseCase.execute(id);
            HttpResponse.success(res, groupWithCategories);
        } catch (error) {
            next(error);
        }
    }
}
