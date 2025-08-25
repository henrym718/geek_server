import { GetGroupWithCategoriesRequest, GetGroupWithCategoriesResponse } from "./get-group-with-categories.dto";

export interface IGetGroupWithCategoriesUseCase {
    execute(data: GetGroupWithCategoriesRequest): Promise<GetGroupWithCategoriesResponse>;
}
