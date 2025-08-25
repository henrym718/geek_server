import { CreateCategoryRequest, CreateCategoryResponse } from "./create-category.dto";

export interface ICreateCategoryUseCase {
    execute(data: CreateCategoryRequest): Promise<CreateCategoryResponse>;
}
