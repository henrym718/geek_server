import { IdVO, TextVO } from "@Core/value-objects";
import { IGroupRepository } from "modules/group/application/interfaces/repositories/group.repository";
import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { Prisma, Group as PrismaGroup, Category as PrismaCategory } from "@prisma/client";
import { Group } from "@Core/entities/group";
import { Category } from "@Core/entities/category";

export class GroupPrismaRepository implements IGroupRepository {
    private get prisma() {
        return PrismaBootstrap.prisma;
    }

    async create(entity: Group): Promise<void> {
        await this.prisma.group.create({ data: this.toPrisma(entity) });
    }

    async update(entity: Group): Promise<void> {
        await this.prisma.group.update({ where: { id: entity.id.getValue() }, data: this.toPrisma(entity) });
    }

    async findByName(name: string): Promise<Group | null> {
        const group = await this.prisma.group.findFirst({ where: { name: { equals: name, mode: "insensitive" } } });
        return group ? this.toDomain(group) : null;
    }

    async findById(id: string): Promise<Group | null> {
        const group = await this.prisma.group.findUnique({ where: { id } });
        return group ? this.toDomain(group) : null;
    }

    async findGroupbyIdWithCategories(id: string): Promise<{ group: Group; categories: Category[] } | null> {
        const group = await this.prisma.group.findUnique({ where: { id }, include: { categories: true } });
        if (!group) return null;
        return {
            group: this.toDomain(group),
            categories: this.toDomainCategories(group.categories),
        };
    }

    async findAll(): Promise<Group[]> {
        const groups = await this.prisma.group.findMany();
        return groups.map(this.toDomain);
    }

    private toPrisma(entity: Group): Prisma.GroupCreateInput {
        return {
            id: entity.id.getValue(),
            name: entity.name.getValue(),
            isActive: entity.isActive,
        };
    }

    private toDomain(entity: PrismaGroup): Group {
        return Group.reconstitute({
            id: IdVO.create(entity.id),
            name: TextVO.create("name", entity.name),
            isActive: entity.isActive,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }

    private toDomainCategories(categories: PrismaCategory[]): Category[] {
        return categories.map((category) =>
            Category.reconstitute({
                id: IdVO.create(category.id),
                name: TextVO.create("name", category.name),
                isActive: category.isActive,
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
                groupId: IdVO.create(category.groupId),
            })
        );
    }
}
