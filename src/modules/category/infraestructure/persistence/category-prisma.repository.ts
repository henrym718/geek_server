import { Category } from "@Core/entities/category";
import { ICategoryRepository } from "@Category/application/interfaces/repositories/category.repository";
import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { Prisma } from "@prisma/client";

export class CategoryPrismaRepository implements ICategoryRepository {
    private get prisma() {
        return PrismaBootstrap.prisma;
    }

    async create(data: Category): Promise<void> {
        await this.prisma.category.create({ data: this.toPrisma(data) });
    }

    async update(entity: Category): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Category | null> {
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<Category[]> {
        throw new Error("Method not implemented.");
    }

    private toPrisma(entity: Category): Prisma.CategoryCreateInput {
        return {
            id: entity.id.getValue(),
            name: entity.name.getValue(),
            group: { connect: { id: entity.groupId.getValue() } },
            isActive: entity.isActive,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt ? entity.updatedAt : undefined,
        };
    }
}
