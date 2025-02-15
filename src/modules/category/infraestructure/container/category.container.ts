import { Container } from "inversify";
import { CATEGORY_SYMBOLS } from "./category.symbol";
import { ICategoryRepository } from "@Category/application/interfaces/repositories/category.repository";
import { CategoryPrismaRepository } from "../persistence/category-prisma.repository";
import { IGroupRepository } from "@Group/application/interfaces/repositories/group.repository";
import { GroupPrismaRepository } from "@Group/infraestructure/persistence/group-prisma.repository";
import { IUUIDService } from "@Shared/interfaces/uuid.service";
import { UUIDServiceImpl } from "@Shared/services/uuid.service.impl";
import { ICreateCategotyUseCase } from "@Category/application/interfaces/use-cases/create-category.use-case";
import { CreateCategory } from "@Category/application/use-cases/create-category";
import { CategoryController } from "@Category/presentation/category.controller";

export const categoryContainer = new Container();

categoryContainer.bind<ICategoryRepository>(CATEGORY_SYMBOLS.CategoryRepository).to(CategoryPrismaRepository);
categoryContainer.bind<IGroupRepository>(CATEGORY_SYMBOLS.GroupRepository).to(GroupPrismaRepository);
categoryContainer.bind<IUUIDService>(CATEGORY_SYMBOLS.IdService).to(UUIDServiceImpl);
categoryContainer.bind<ICreateCategotyUseCase>(CATEGORY_SYMBOLS.CreateCategotyUseCase).to(CreateCategory);
categoryContainer.bind<CategoryController>(CategoryController).toSelf();
