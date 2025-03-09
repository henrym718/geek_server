import { ProformaRequest } from "@Core/entities/proforma-requests";
import { Skill } from "@Core/entities/skill";
import { Category } from "@Core/entities/category";
import { IRepository } from "@Shared/repositories/repository";

export interface ProformaRequestWithRelations {
    proformaRequest: ProformaRequest;
    skills: Skill[];
    category: Category;
}
export interface IProformaRequestsRepository extends IRepository<ProformaRequest> {
    findAllByClientId(clientId: string): Promise<ProformaRequestWithRelations[]>;
}
