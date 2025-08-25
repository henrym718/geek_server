import { ICategoryRepository } from "modules/admin/category/application/repositories/category.repository";
import { ICreateCategoryUseCase } from "./create-category.use-case";
import { CreateCategoryRequest, CreateCategoryResponse } from "./create-category.dto";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { IGroupRepository } from "@Group/application/repositories/group.repository";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { inject, injectable } from "inversify";
import { HttpException } from "@Common/exceptions/http.exception";
import { IdVO, TextVO } from "@Core/value-objects";
import { Category } from "@Core/entities/category";

@injectable()
export class CreateCategoryUseCase implements ICreateCategoryUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.CategoryRepository) private readonly categoryRepository: ICategoryRepository,
        @inject(SHARED_SYMBOLS.GroupRepository) private readonly groupRepository: IGroupRepository,
        @inject(SHARED_SYMBOLS.UUIDService) private readonly uuidService: IUUIDService
    ) {}
    async execute(data: CreateCategoryRequest): Promise<CreateCategoryResponse> {
        const { name, groupId } = data;

        const groupExists = await this.groupRepository.findById(groupId);
        if (!groupExists) throw HttpException.notFound(`El grupo con id ${groupId} no existe.`);

        const categoryId = IdVO.create(this.uuidService.generateUUID());
        const categoryName = TextVO.create("name", name);
        const groupIdVo = IdVO.create(groupId);

        const category = Category.create({
            id: categoryId,
            name: categoryName,
            groupId: groupIdVo,
        });

        await this.categoryRepository.create(category);

        return { detail: "Categoria creada correctamente" };
    }
}
