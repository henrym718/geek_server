import { GetAllGroupsResponse } from "./get-all-groups.dto";

export interface IGetAllGroupsUseCase {
    execute(): Promise<GetAllGroupsResponse[]>;
}
