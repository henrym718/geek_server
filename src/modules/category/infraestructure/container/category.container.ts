import { Container } from "inversify";
import { CATEGORY_SYMBOLS } from "./category.symbol";
import { CategoryController } from "@Category/presentation/category.controller";
import { registerControllers, registerUseCases } from "@Common/utils/container-utils";
import { CreateCategoryUseCase } from "@Category/application/use-cases/create-category/create-category.impl";
import { GetCategoriesByGroupIdUseCase } from "@Category/application/use-cases/get-categories-by-groupId/get-categories-by-groupId.impl";

export function configureCategoryContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    registerUseCases(container, [
        { symbol: CATEGORY_SYMBOLS.CreateCategory, implementation: CreateCategoryUseCase },
        { symbol: CATEGORY_SYMBOLS.GetCategoriesByGroupId, implementation: GetCategoriesByGroupIdUseCase },
    ]);
    registerControllers(container, [CategoryController]);

    return container;
}
