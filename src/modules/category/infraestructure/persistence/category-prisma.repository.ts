import { Category } from "@Core/entities/category";
import { ICategoryRepository } from "@Category/application/interfaces/repositories/category.repository";
import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { CategoryMapper } from "./category.mapper";

export class CategoryPrismaRepository implements ICategoryRepository {
    private get prisma() {
        return PrismaBootstrap.prisma;
    }

    async create(data: Category): Promise<void> {
        await this.prisma.category.create({ data: CategoryMapper.toPersistence(data) });
    }

    async update(entity: Category): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Category | null> {
        const category = await this.prisma.category.findUnique({ where: { id } });
        return category ? CategoryMapper.toDomain(category) : null;
    }

    async findAll(): Promise<Category[]> {
        throw new Error("Method not implemented.");
    }
}
