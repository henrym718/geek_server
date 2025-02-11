import { Container } from "inversify";
import { IGroupRepository } from "@Group/application/interfaces/repositories/group.repository";
import { GROUP_SYMBOLS } from "@Group/infraestructure/container/group.symbol";
import { GroupPrismaRepository } from "@Group/infraestructure/persistence/group-prisma.repository";
import { ICreateGroupUseCase } from "@Group/application/interfaces/use-cases/create-group.use-case";
import { IUpdateGroupUseCase } from "@Group/application/interfaces/use-cases/update-group.use-case";
import { CreateGroup } from "@Group/application/use-cases/create-group";
import { UpdateGroup } from "@Group/application/use-cases/update-group";
import { IUUIDService } from "@Shared/interfaces/uuid.service";
import { UUIDServiceImpl } from "@Shared/services/uuid.service.impl";
import { GroupController } from "@Group/presentation/group.controller";

export const groupContainer = new Container();

groupContainer.bind<IGroupRepository>(GROUP_SYMBOLS.GroupRepository).to(GroupPrismaRepository).inSingletonScope();
groupContainer.bind<IUUIDService>(GROUP_SYMBOLS.IdService).to(UUIDServiceImpl);
groupContainer.bind<ICreateGroupUseCase>(GROUP_SYMBOLS.CreateGroupUseCase).to(CreateGroup);
groupContainer.bind<IUpdateGroupUseCase>(GROUP_SYMBOLS.UpdateGroupUseCase).to(UpdateGroup);
groupContainer.bind<GroupController>(GroupController).toSelf();
