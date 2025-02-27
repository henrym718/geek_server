import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { Skill } from "@Core/entities/skill";
import { ISkillRepository } from "modules/skill/application/repositories/skill.repository";
import { SkillMapper } from "./skill.mapper";

export class SkillPrismaRepository implements ISkillRepository {
    private get prisma() {
        return PrismaBootstrap.prisma;
    }

    async create(data: Skill): Promise<void> {
        await this.prisma.skill.create({ data: SkillMapper.toPersistence(data) });
    }

    update(entity: Skill): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findById(id: string): Promise<Skill | null> {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<Skill[]> {
        throw new Error("Method not implemented.");
    }
}
