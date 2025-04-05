import { inject, injectable } from "inversify";
import { GetAllGroupsResponse } from "./get-all-groups.dto";
import { IGetAllGroupsUseCase } from "./get-all-groups.use-case";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { IGroupRepository } from "@Group/application/repositories/group.repository";

@injectable()
export class GetAllGroupsUseCase implements IGetAllGroupsUseCase {
    constructor(@inject(SHARED_SYMBOLS.GroupRepository) private readonly groupRepository: IGroupRepository) {}
    async execute(): Promise<GetAllGroupsResponse[]> {
        const groups = await this.groupRepository.findAll();

        return groups.map((group) => ({
            id: group.id.getValue(),
            name: group.name.getValue(),
        }));
    }
}
