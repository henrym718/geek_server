import { ProformaRequest } from "@Core/entities/proforma-requests";
import { Skill } from "@Core/entities/skill";
import { Category } from "@Core/entities/category";
import { IRepository } from "@Shared/interfaces/repository";
import { StatusRequestVO } from "@Core/value-objects/status-request.vo";

export interface ProformaRequestWithRelations {
    proformaRequest: ProformaRequest;
    skills: Skill[];
    category: Category;
}
export interface IProformaRequestsRepository extends IRepository<ProformaRequest> {
    findAllByClientId(clientId: string, status: StatusRequestVO): Promise<ProformaRequestWithRelations[]>;
    findByCategoryIdAndSkills(categoryId: string, skillIds: string[]): Promise<ProformaRequestWithRelations[]>;
}
