import { Container } from "inversify";
import { GROUP_SYMBOLS } from "@Group/infraestructure/container/group.symbol";
import { CreateGroup } from "@Group/application/use-cases/create-group";
import { UpdateGroup } from "@Group/application/use-cases/update-group";
import { GroupController } from "@Group/presentation/group.controller";
import { ListGroup } from "@Group/application/use-cases/list-group";
import { GroupWithCategories } from "@Group/application/use-cases/group-with-categories ";
import { registerUseCases, registerControllers } from "@Common/utils/container-utils";

export function configureGroupContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    registerUseCases(container, [
        { symbol: GROUP_SYMBOLS.CreateGroupUseCase, implementation: CreateGroup },
        { symbol: GROUP_SYMBOLS.UpdateGroupUseCase, implementation: UpdateGroup },
        { symbol: GROUP_SYMBOLS.ListGroupUseCase, implementation: ListGroup },
        { symbol: GROUP_SYMBOLS.GroupWithCategoriesUseCase, implementation: GroupWithCategories },
    ]);

    registerControllers(container, [GroupController]);

    return container;
}
