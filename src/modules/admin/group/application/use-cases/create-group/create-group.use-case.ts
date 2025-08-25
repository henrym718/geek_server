import { CreateGroupRequest, CreateGroupResponse } from "./create-group.dto";

export interface ICreateGroupUseCase {
    execute(data: CreateGroupRequest): Promise<CreateGroupResponse>;
}
