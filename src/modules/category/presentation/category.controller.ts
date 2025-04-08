import { CreateCategoryRequest } from "@Category/application/use-cases/create-category/create-category.dto";
import { ICreateCategoryUseCase } from "@Category/application/use-cases/create-category/create-category.use-case";
import { GetCategoriesByGroupIdRequest } from "@Category/application/use-cases/get-categories-by-groupId/get-categories-by-groupId.dto";
import { IGetCategoriesByGroupIdUseCase } from "@Category/application/use-cases/get-categories-by-groupId/get-categories-by-groupId.use-case";
import { CATEGORY_SYMBOLS } from "@Category/infraestructure/container/category.symbol";
import { HttpResponse } from "@Common/response/http.response";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class CategoryController {
    constructor(
        @inject(CATEGORY_SYMBOLS.CreateCategory) private readonly createCategotyUseCase: ICreateCategoryUseCase,
        @inject(CATEGORY_SYMBOLS.GetCategoriesByGroupId) private readonly getCategoriesByGroupIdUseCase: IGetCategoriesByGroupIdUseCase
    ) {
        this.createCategory = this.createCategory.bind(this);
        this.getCategoriesByGroupId = this.getCategoriesByGroupId.bind(this);
    }

    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data: CreateCategoryRequest = req.body;
            const response = await this.createCategotyUseCase.execute(data);
            HttpResponse.success(res, response, "Registro creado correctamente");
        } catch (error) {
            next(error);
        }
    }

    async getCategoriesByGroupId(req: Request, res: Response, next: NextFunction) {
        try {
            const data: GetCategoriesByGroupIdRequest = { groupId: req.params.groupId };
            const response = await this.getCategoriesByGroupIdUseCase.execute(data);
            HttpResponse.success(res, response, "Categorías obtenidas correctamente");
        } catch (error) {
            next(error);
        }
    }
}
