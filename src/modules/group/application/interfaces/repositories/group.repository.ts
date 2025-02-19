import { IRepository } from "@Shared/repositories/repository";
import { Group } from "@Core/entities/group";
import { Category } from "@Core/entities/category";

export interface IGroupRepository extends IRepository<Group> {
    findByName(name: string): Promise<Group | null>;
    findGroupbyIdWithCategories(id: string): Promise<{ group: Group; categories: Category[] } | null>;
}
