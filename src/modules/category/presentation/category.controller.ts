import { ReqCreateCategoryDTO } from "@Category/application/dtos/req-create-category.dto";
import { ICreateCategotyUseCase } from "@Category/application/interfaces/use-cases/create-category.use-case";
import { CATEGORY_SYMBOLS } from "@Category/infraestructure/container/category.symbol";
import { HttpResponse } from "@Common/response/http.response";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class CategoryController {
    constructor(@inject(CATEGORY_SYMBOLS.CreateCategotyUseCase) private readonly createCategotyUseCase: ICreateCategotyUseCase) {
        this.createCategory = this.createCategory.bind(this);
    }

    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqCreateCategoryDTO = req.body;
            await this.createCategotyUseCase.execute(data);
            HttpResponse.success(res, null, "Registro creado correctamente");
        } catch (error) {
            next(error);
        }
    }
}
