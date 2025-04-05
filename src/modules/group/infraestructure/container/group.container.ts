import { Container } from "inversify";
import { GROUP_SYMBOLS } from "@Group/infraestructure/container/group.symbol";
import { CreateGroupUseCase } from "@Group/application/use-cases/create-group/create-group.impl";
import { GroupController } from "@Group/presentation/group.controller";
import { registerUseCases, registerControllers } from "@Common/utils/container-utils";
import { GetAllGroupsUseCase } from "@Group/application/use-cases/get-all-groups/get-all-groups.impl";
import { GetGroupWithCategoriesUseCase } from "@Group/application/use-cases/get-group-with-categories/get-group-with-categories.impl";
import { UpdateGroupUseCase } from "@Group/application/use-cases/update-group/update-group.impl";

export function configureGroupContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    registerUseCases(container, [
        { symbol: GROUP_SYMBOLS.CreateGroup, implementation: CreateGroupUseCase },
        { symbol: GROUP_SYMBOLS.UpdateGroup, implementation: UpdateGroupUseCase },
        { symbol: GROUP_SYMBOLS.GetAllGroups, implementation: GetAllGroupsUseCase },
        { symbol: GROUP_SYMBOLS.GetGroupWithCategories, implementation: GetGroupWithCategoriesUseCase },
    ]);

    registerControllers(container, [GroupController]);

    return container;
}
