import { GetCategoriesByGroupIdRequest, GetCategoriesByGroupIdResponse } from "./get-categories-by-groupId.dto";

export interface IGetCategoriesByGroupIdUseCase {
    execute(request: GetCategoriesByGroupIdRequest): Promise<GetCategoriesByGroupIdResponse[]>;
}
