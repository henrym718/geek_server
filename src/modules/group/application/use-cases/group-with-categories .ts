import { inject, injectable } from "inversify";
import { ResGroupWithCategoriesDTO } from "../dtos/res-group-with-categories.dto ";
import { IGroupRepository } from "../interfaces/repositories/group.repository";
import { IGroupWithCategoriesUseCase } from "../interfaces/use-cases/group-with-categories.use-case";
import { GROUP_SYMBOLS } from "@Group/infraestructure/container/group.symbol";
import { HttpException } from "@Common/exceptions/http.exception";

@injectable()
export class GroupWithCategories implements IGroupWithCategoriesUseCase {
    constructor(@inject(GROUP_SYMBOLS.GroupRepository) private readonly groupRepository: IGroupRepository) {}

    async execute(id: string): Promise<ResGroupWithCategoriesDTO> {
        const result = await this.groupRepository.findGroupbyIdWithCategories(id);
        if (!result) throw HttpException.notFound("Group not found");
        const { group, categories } = result;

        return {
            id: group.id.getValue(),
            name: group.name.getValue(),
            categories: categories.map((category) => ({ id: category.id.getValue(), name: category.name.getValue() })),
        };
    }
}
