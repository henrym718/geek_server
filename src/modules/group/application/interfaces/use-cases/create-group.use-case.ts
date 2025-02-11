import { ReqCreateGroupDTO } from "../../dtos/req-create-group.dto";

export interface ICreateGroupUseCase {
    execute(data: ReqCreateGroupDTO): Promise<void>;
}
