import { IGroupRepository } from "@Group/application/interfaces/repositories/group.repository";
import { ReqCreateCategoryDTO } from "../dtos/req-create-category.dto";
import { ICategoryRepository } from "../interfaces/repositories/category.repository";
import { ICreateCategotyUseCase } from "../interfaces/use-cases/create-category.use-case";
import { HttpException } from "@Common/exceptions/http.exception";
import { IUUIDService } from "@Shared/interfaces/uuid.service";
import { IdVO, TextVO } from "@Core/value-objects";
import { Category } from "@Core/entities/category";

export class CreateCategory implements ICreateCategotyUseCase {
    private constructor(
        private readonly categoryRepository: ICategoryRepository,
        private readonly groupRepository: IGroupRepository,
        private readonly idService: IUUIDService
    ) {}

    async execute(data: ReqCreateCategoryDTO): Promise<void> {
        const { name, groupId } = data;

        const groupExists = await this.groupRepository.findById(groupId);
        if (groupExists) throw HttpException.notFound(`El grupo con id ${groupId} no existe.`);

        const categoryId = IdVO.create(this.idService.generateUUID());
        const categoryName = TextVO.create("name", name);
        const groupIdVo = IdVO.create(groupId);

        const category = Category.create({
            id: categoryId,
            name: categoryName,
            groupId: groupIdVo,
        });

        await this.categoryRepository.create(category);
    }
}
