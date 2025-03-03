import { Skill } from "@Core/entities/skill";
import { IRepository } from "@Shared/repositories/repository";

export interface ISkillRepository extends IRepository<Skill> {
    findByIds(ids: string[]): Promise<Skill[]>;
}
