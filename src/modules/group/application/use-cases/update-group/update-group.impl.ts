import { inject } from "inversify";
import { UpdateGroupRequest, UpdateGroupResponse } from "./update-group.dto";
import { IUpdateGroupUseCase } from "./update-group.use.case";
import { IGroupRepository } from "@Group/application/repositories/group.repository";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { IdVO, TextVO } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";

export class UpdateGroupUseCase implements IUpdateGroupUseCase {
    constructor(@inject(SHARED_SYMBOLS.GroupRepository) private readonly groupRepository: IGroupRepository) {}

    async execute(data: UpdateGroupRequest): Promise<UpdateGroupResponse> {
        const { id, name } = data;
        const groupFound = await this.groupRepository.findById(IdVO.create(id).getValue());
        if (!groupFound) throw HttpException.notFound("Group not found");
        const updatedGroup = groupFound.update({ name: TextVO.create("Name", name) });
        await this.groupRepository.update(updatedGroup);

        return { details: "Group updated successfully" };
    }
}
