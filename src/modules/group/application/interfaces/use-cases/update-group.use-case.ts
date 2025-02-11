import { ReqUpdateGroupDTO } from "@Group/application/dtos/req-update-group.dto.";

export interface IUpdateGroupUseCase {
    execute(data: ReqUpdateGroupDTO): Promise<void>;
}
