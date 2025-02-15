import { ReqCreateCategoryDTO } from "../../dtos/req-create-category.dto";

export interface ICreateCategotyUseCase {
    execute(data: ReqCreateCategoryDTO): Promise<void>;
}
