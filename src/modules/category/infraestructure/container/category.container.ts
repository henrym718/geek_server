import { Container } from "inversify";
import { CATEGORY_SYMBOLS } from "./category.symbol";
import { CreateCategory } from "@Category/application/use-cases/create-category";
import { CategoryController } from "@Category/presentation/category.controller";
import { registerControllers, registerUseCases } from "@Common/utils/container-utils";

export function configureCategoryContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    registerUseCases(container, [{ symbol: CATEGORY_SYMBOLS.CreateCategotyUseCase, implementation: CreateCategory }]);
    registerControllers(container, [CategoryController]);

    return container;
}
