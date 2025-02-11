import { ReqCreateCategoryDTO } from "../../dtos/req-create-category.dto";

export interface ICreateGroupUseCase {
    execute(data: ReqCreateCategoryDTO): Promise<void>;
}
