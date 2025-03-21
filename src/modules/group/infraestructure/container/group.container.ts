import { Container } from "inversify";
import { IGroupRepository } from "@Group/application/interfaces/repositories/group.repository";
import { GROUP_SYMBOLS } from "@Group/infraestructure/container/group.symbol";
import { GroupPrismaRepository } from "@Group/infraestructure/persistence/group-prisma.repository";
import { ICreateGroupUseCase } from "@Group/application/interfaces/use-cases/create-group.use-case";
import { IUpdateGroupUseCase } from "@Group/application/interfaces/use-cases/update-group.use-case";
import { CreateGroup } from "@Group/application/use-cases/create-group";
import { UpdateGroup } from "@Group/application/use-cases/update-group";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { UUIDServiceImpl } from "@Shared/services/uuid/uuid.service.impl";
import { GroupController } from "@Group/presentation/group.controller";
import { IListGroupsUseCase } from "@Group/application/interfaces/use-cases/list-groups.use-case";
import { ListGroup } from "@Group/application/use-cases/list-group";
import { IGroupWithCategoriesUseCase } from "@Group/application/interfaces/use-cases/group-with-categories.use-case";
import { GroupWithCategories } from "@Group/application/use-cases/group-with-categories ";

export const groupContainer = new Container();

groupContainer.bind<IGroupRepository>(GROUP_SYMBOLS.GroupRepository).to(GroupPrismaRepository).inSingletonScope();
groupContainer.bind<IUUIDService>(GROUP_SYMBOLS.IdService).to(UUIDServiceImpl);
groupContainer.bind<ICreateGroupUseCase>(GROUP_SYMBOLS.CreateGroupUseCase).to(CreateGroup);
groupContainer.bind<IUpdateGroupUseCase>(GROUP_SYMBOLS.UpdateGroupUseCase).to(UpdateGroup);
groupContainer.bind<IListGroupsUseCase>(GROUP_SYMBOLS.ListGroupUseCase).to(ListGroup);
groupContainer.bind<IGroupWithCategoriesUseCase>(GROUP_SYMBOLS.GroupWithCategoriesUseCase).to(GroupWithCategories);

groupContainer.bind<GroupController>(GroupController).toSelf();
