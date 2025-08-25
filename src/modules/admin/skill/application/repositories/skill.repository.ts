import { Skill } from "@Core/entities/skill";
import { IRepository } from "@Shared/interfaces/repository";

export interface ISkillRepository extends IRepository<Skill> {
    findByIds(ids: string[]): Promise<Skill[]>;
    areSkillsValidForCategory(categoryId: string, skillIds: string[]): Promise<boolean>;
    getSkillsByCategoryId(categoryId: string): Promise<Skill[]>;
}
