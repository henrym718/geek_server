import { Skill } from "@Core/entities/skill";
import { IRepository } from "@Shared/repositories/repository";

export interface ISkillRepository extends IRepository<Skill> {
    findByIds(ids: string[]): Promise<Skill[]>;
    areSkillsValidForCategory(categoryId: string, skillIds: string[]): Promise<boolean>;
    findAllBySearchText(searchText: string, limit: number): Promise<Skill[]>;
}
