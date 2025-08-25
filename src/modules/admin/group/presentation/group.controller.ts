import { HttpResponse } from "@Common/response/http.response";
import { CreateGroupRequest } from "@Group/application/use-cases/create-group/create-group.dto";
import { ICreateGroupUseCase } from "@Group/application/use-cases/create-group/create-group.use-case";
import { IGetAllGroupsUseCase } from "@Group/application/use-cases/get-all-groups/get-all-groups.use-case";
import { IGetGroupWithCategoriesUseCase } from "@Group/application/use-cases/get-group-with-categories/get-group-with-categories.use-case";
import { UpdateGroupRequest } from "@Group/application/use-cases/update-group/update-group.dto";
import { IUpdateGroupUseCase } from "@Group/application/use-cases/update-group/update-group.use.case";
import { GROUP_SYMBOLS } from "@Group/infraestructure/container/group.symbol";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class GroupController {
    constructor(
        @inject(GROUP_SYMBOLS.CreateGroup) private readonly createGroupUseCase: ICreateGroupUseCase,
        @inject(GROUP_SYMBOLS.UpdateGroup) private readonly updateGroupUseCase: IUpdateGroupUseCase,
        @inject(GROUP_SYMBOLS.GetAllGroups) private readonly getAllGroupsUseCase: IGetAllGroupsUseCase,
        @inject(GROUP_SYMBOLS.GetGroupWithCategories) private readonly groupWithCategoriesUseCase: IGetGroupWithCategoriesUseCase
    ) {
        this.createGroup = this.createGroup.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
        this.getAllGroups = this.getAllGroups.bind(this);
        this.getGroupWithCategories = this.getGroupWithCategories.bind(this);
    }

    async createGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const data: CreateGroupRequest = req.body;
            await this.createGroupUseCase.execute(data);
            HttpResponse.success(res, null, "Rgeistro creado correctamente");
        } catch (error) {
            next(error);
        }
    }

    async updateGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const data: UpdateGroupRequest = req.body;
            await this.updateGroupUseCase.execute(data);
            HttpResponse.success(res, null, "Rgeistro actualizado correctamente");
        } catch (error) {
            next(error);
        }
    }

    async getAllGroups(req: Request, res: Response, next: NextFunction) {
        try {
            const groupsFound = await this.getAllGroupsUseCase.execute();
            HttpResponse.success(res, groupsFound);
        } catch (error) {
            next(error);
        }
    }

    async getGroupWithCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const groupWithCategories = await this.groupWithCategoriesUseCase.execute({ id });
            HttpResponse.success(res, groupWithCategories);
        } catch (error) {
            next(error);
        }
    }
}
