import { Group } from "@Core/entities/group";
import { IdVO, TextVO } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { inject, injectable } from "inversify";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { ICreateGroupUseCase } from "./create-group.use-case";
import { CreateGroupRequest, CreateGroupResponse } from "./create-group.dto";
import { IGroupRepository } from "@Group/application/repositories/group.repository";

@injectable()
export class CreateGroupUseCase implements ICreateGroupUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.GroupRepository) private readonly groupRepository: IGroupRepository,
        @inject(SHARED_SYMBOLS.UUIDService) private readonly idService: IUUIDService
    ) {}

    async execute(data: CreateGroupRequest): Promise<CreateGroupResponse> {
        const { name } = data;
        const existingGroup = await this.groupRepository.findByName("h");
        if (existingGroup) throw HttpException.badRequest("Group already exists");

        const groupId = IdVO.create(this.idService.generateUUID());
        const groupName = TextVO.create("Name", name);
        const group = Group.create({ id: groupId, name: groupName });
        this.groupRepository.create(group);
        return { details: "Group created successfully" };
    }
}
