import { Container } from "inversify";
import { CATEGORY_SYMBOLS } from "./category.symbol";
import { CategoryController } from "modules/admin/category/presentation/category.controller";
import { registerControllers, registerUseCases } from "@Common/utils/container-utils";
import { CreateCategoryUseCase } from "modules/admin/category/application/use-cases/create-category/create-category.impl";
import { GetCategoriesByGroupIdUseCase } from "modules/admin/category/application/use-cases/get-categories-by-groupId/get-categories-by-groupId.impl";

export function configureCategoryContainer(rootContainer: Container) {
    registerUseCases(rootContainer, [
        { symbol: CATEGORY_SYMBOLS.CreateCategory, implementation: CreateCategoryUseCase },
        { symbol: CATEGORY_SYMBOLS.GetCategoriesByGroupId, implementation: GetCategoriesByGroupIdUseCase },
    ]);
    registerControllers(rootContainer, [CategoryController]);
}
