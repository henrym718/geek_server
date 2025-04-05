import { UpdateGroupRequest, UpdateGroupResponse } from "./update-group.dto";

export interface IUpdateGroupUseCase {
    execute(data: UpdateGroupRequest): Promise<UpdateGroupResponse>;
}
