import { IdVO, TextVO } from "@Core/value-objects";
import { ReqUpdateGroupDTO } from "../dtos/req-update-group.dto.";
import { IGroupRepository } from "../interfaces/repositories/group.repository";
import { IUpdateGroupUseCase } from "../interfaces/use-cases/update-group.use-case";
import { HttpException } from "@Common/exceptions/http.exception";
import { inject, injectable } from "inversify";
import { GROUP_SYMBOLS } from "@Group/infraestructure/container/group.symbol";

@injectable()
export class UpdateGroup implements IUpdateGroupUseCase {
    constructor(@inject(GROUP_SYMBOLS.GroupRepository) private readonly groupRepository: IGroupRepository) {}

    async execute(data: ReqUpdateGroupDTO): Promise<void> {
        const { id, name } = data;
        const groupFound = await this.groupRepository.findById(IdVO.create(id).getValue());
        if (!groupFound) throw HttpException.notFound("Group not found");
        const updatedGroup = groupFound.update({ name: TextVO.create("Name", name) });
        await this.groupRepository.update(updatedGroup);
    }
}
