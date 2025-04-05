import { Category } from "@Core/entities/category";
import { ICategoryRepository } from "@Category/application/repositories/category.repository";
import { CategoryMapper } from "./category.mapper";
import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";

export class CategoryPrismaRepository implements ICategoryRepository {
    private get db() {
        return PrismaBootstrap.prisma.category;
    }

    async create(data: Category): Promise<void> {
        await this.db.create({ data: CategoryMapper.toPersistence(data) });
    }

    async update(entity: Category): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Category | null> {
        const category = await this.db.findUnique({ where: { id } });
        return category ? CategoryMapper.toDomain(category) : null;
    }

    async findAll(): Promise<Category[]> {
        throw new Error("Method not implemented.");
    }
}
