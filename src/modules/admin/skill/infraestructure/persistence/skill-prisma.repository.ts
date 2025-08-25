import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { Skill } from "@Core/entities/skill";
import { ISkillRepository } from "modules/admin/skill/application/repositories/skill.repository";
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

    async getSkillsByCategoryId(categoryId: string): Promise<Skill[]> {
        const response = await this.db.skill.findMany({ where: { categoryId } });
        return response.map(SkillMapper.toDomain);
    }

    async findByIds(ids: string[]): Promise<Skill[]> {
        const skills = await this.db.skill.findMany({ where: { id: { in: ids } } });
        return skills.map(SkillMapper.toDomain);
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
