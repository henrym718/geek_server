import { inject, injectable } from "inversify";
import { IGetGroupWithCategoriesUseCase } from "./get-group-with-categories.use-case";
import { GetGroupWithCategoriesRequest, GetGroupWithCategoriesResponse } from "./get-group-with-categories.dto";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { IGroupRepository } from "@Group/application/repositories/group.repository";
import { HttpException } from "@Common/exceptions/http.exception";

@injectable()
export class GetGroupWithCategoriesUseCase implements IGetGroupWithCategoriesUseCase {
    constructor(@inject(SHARED_SYMBOLS.GroupRepository) private readonly groupRepository: IGroupRepository) {}

    async execute(data: GetGroupWithCategoriesRequest): Promise<GetGroupWithCategoriesResponse> {
        const result = await this.groupRepository.findGroupbyIdWithCategories(data.id);
        if (!result) throw HttpException.notFound("Group not found");
        const { group, categories } = result;

        return {
            id: group.id.getValue(),
            name: group.name.getValue(),
            categories: categories.map((category) => ({
                id: category.id.getValue(),
                name: category.name.getValue(),
            })),
        };
    }
}
