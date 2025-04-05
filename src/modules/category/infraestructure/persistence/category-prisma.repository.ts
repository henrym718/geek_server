import { Category } from "@Core/entities/category";
import { ICategoryRepository } from "@Category/application/repositories/category.repository";
import { CategoryMapper } from "./category.mapper";
import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";

export class CategoryPrismaRepository implements ICategoryRepository {
    private get db() {
        return PrismaBootstrap.prisma;
    }

    async create(data: Category): Promise<void> {
        await this.db.category.create({ data: CategoryMapper.toPersistence(data) });
    }

    async update(entity: Category): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Category | null> {
        const category = await this.db.category.findUnique({ where: { id } });
        return category ? CategoryMapper.toDomain(category) : null;
    }

    async findByGroupId(groupId: string): Promise<Category[]> {
        const response = await this.db.category.findMany({ where: { groupId } });
        return response.map((category) => CategoryMapper.toDomain(category));
    }

    async findAll(): Promise<Category[]> {
        throw new Error("Method not implemented.");
    }
}
