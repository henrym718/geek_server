import { Group } from "@Core/entities/group";
import { IGroupRepository } from "modules/group/application/interfaces/repositories/group.repository";
import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { Prisma, Group as GroupPrisma } from "@prisma/client";
import { IdVO, TextVO } from "@Core/value-objects";

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
        return await this.prisma.group
            .findFirst({ where: { name: { equals: name, mode: "insensitive" } } })
            .then((group) => (group ? this.toDomain(group) : null));
    }

    async findById(id: string): Promise<Group | null> {
        return await this.prisma.group.findUnique({ where: { id } }).then((group) => (group ? this.toDomain(group) : null));
    }

    async findAll(): Promise<Group[]> {
        return await this.prisma.group.findMany().then((groups) => groups.map(this.toDomain));
    }

    private toPrisma(entity: Group): Prisma.GroupCreateInput {
        return { id: entity.id.getValue(), name: entity.name.getValue() };
    }

    private toDomain(entity: GroupPrisma): Group {
        return Group.reconstitute({
            id: IdVO.create(entity.id),
            name: TextVO.create("name", entity.name),
            isActive: entity.isActive,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
}
