import { IListGroupsUseCase } from "../interfaces/use-cases/list-groups.use-case";
import { IGroupRepository } from "../interfaces/repositories/group.repository";
import { inject, injectable } from "inversify";
import { GROUP_SYMBOLS } from "@Group/infraestructure/container/group.symbol";
import { ResListGroupDTO } from "../dtos/res-list-group.dto";

@injectable()
export class ListGroup implements IListGroupsUseCase {
    constructor(@inject(GROUP_SYMBOLS.GroupRepository) private readonly groupRepository: IGroupRepository) {}
    async execute(): Promise<ResListGroupDTO[]> {
        const groups = await this.groupRepository.findAll();

        return groups.map((group) => ({
            id: group.id.getValue(),
            name: group.name.getValue(),
        }));
    }
}
