import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { Skill } from "@Core/entities/skill";
import { ISkillRepository } from "modules/skill/application/repositories/skill.repository";
import { SkillMapper } from "./skill.mapper";

export class SkillPrismaRepository implements ISkillRepository {
    private get db() {
        return PrismaBootstrap.prisma;
    }

    async create(data: Skill): Promise<void> {
        await this.db.skill.create({ data: SkillMapper.toPersistence(data) });
    }

    update(entity: Skill): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findById(id: string): Promise<Skill | null> {
        throw new Error("Method not implemented.");
    }

    async findByIds(ids: string[]): Promise<Skill[]> {
        const skills = await this.db.skill.findMany({ where: { id: { in: ids } } });
        return skills.map(SkillMapper.toDomain);
    }

    async findAllBySearchText(searchText: string, limit: number): Promise<Skill[]> {
        const skills = await this.db.skill.findMany({
            where: { name: { contains: searchText, mode: "insensitive" } },
            take: limit,
        });

        return skills.map((skill) => SkillMapper.toDomain(skill));
    }

    findAll(): Promise<Skill[]> {
        throw new Error("Method not implemented.");
    }

    async areSkillsValidForCategory(categoryId: string, skillIds: string[]): Promise<boolean> {
        const skills = await this.db.skill.findMany({
            where: {
                id: { in: skillIds },
                categoryId: categoryId,
            },
        });
        return skills.length === skillIds.length;
    }
}
