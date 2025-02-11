import { IRepository } from "shared/interfaces/repository";
import { Group } from "@Core/entities/group";

export interface IGroupRepository extends IRepository<Group> {
    findByName(name: string): Promise<Group | null>;
}
