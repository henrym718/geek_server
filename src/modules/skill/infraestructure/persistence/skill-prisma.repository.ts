import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { ISkillRepository } from "modules/skill/application/repositories/skill.repository";

export class SkillPrismaRepository implements ISkillRepository {
    private get prisma() {
        return PrismaBootstrap.prisma;
    }

    create(data: { name: string; id: string; categoryId: string }): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(entity: { name: string; id: string; categoryId: string }): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findById(id: string): Promise<{ name: string; id: string; categoryId: string } | null> {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<{ name: string; id: string; categoryId: string }[]> {
        throw new Error("Method not implemented.");
    }
}
