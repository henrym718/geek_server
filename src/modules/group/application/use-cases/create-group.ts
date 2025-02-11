import { Group } from "@Core/entities/group";
import { ReqCreateGroupDTO } from "../dtos/req-create-group.dto";
import { IGroupRepository } from "../interfaces/repositories/group.repository";
import { ICreateGroupUseCase } from "../interfaces/use-cases/create-group.use-case";
import { IdVO, TextVO } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";
import { IUUIDService } from "@Shared/interfaces/uuid.service";
import { inject, injectable } from "inversify";
import { GROUP_SYMBOLS } from "modules/group/infraestructure/container/group.symbol";

@injectable()
export class CreateGroup implements ICreateGroupUseCase {
    constructor(
        @inject(GROUP_SYMBOLS.GroupRepository) private readonly groupRepository: IGroupRepository,
        @inject(GROUP_SYMBOLS.IdService) private readonly idService: IUUIDService
    ) {}

    async execute(data: ReqCreateGroupDTO): Promise<void> {
        const { name } = data;
        const existingGroup = await this.groupRepository.findByName("h");
        if (existingGroup) throw HttpException.badRequest("Group already exists");

        const groupId = IdVO.create(this.idService.generateUUID());
        const groupName = TextVO.create("Name", name);
        const group = Group.create({ id: groupId, name: groupName });
        this.groupRepository.create(group);
    }
}
