import { inject, injectable } from "inversify";
import { IGetCategoriesByGroupIdUseCase } from "./get-categories-by-groupId.use-case";
import { ICategoryRepository } from "@Category/application/repositories/category.repository";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { GetCategoriesByGroupIdRequest, GetCategoriesByGroupIdResponse } from "./get-categories-by-groupId.dto";

@injectable()
export class GetCategoriesByGroupIdUseCase implements IGetCategoriesByGroupIdUseCase {
    constructor(@inject(SHARED_SYMBOLS.CategoryRepository) private readonly categoryRepository: ICategoryRepository) {}

    async execute(request: GetCategoriesByGroupIdRequest): Promise<GetCategoriesByGroupIdResponse[]> {
        const categories = await this.categoryRepository.findByGroupId(request.groupId);
        return categories.map((category) => ({
            id: category.id.getValue(),
            name: category.name.getValue(),
        }));
    }
}
