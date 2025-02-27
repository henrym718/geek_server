import { Category } from "@Core/entities/category";
import { IdVO, TextVO } from "@Core/value-objects";
import { Prisma, Category as PrismaCategry } from "@prisma/client";

export class CategoryMapper {
    public static toPersistence(category: Category): Prisma.CategoryCreateInput {
        return {
            id: category.id.getValue(),
            name: category.name.getValue(),
            group: { connect: { id: category.groupId.getValue() } },
        };
    }

    public static toDomain(category: PrismaCategry): Category {
        return Category.reconstitute({
            id: IdVO.create(category.id),
            name: TextVO.create("name", category.name),
            isActive: category.isActive,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
            groupId: IdVO.create(category.groupId),
        });
    }
}
