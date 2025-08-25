import { Category, City, ProformaRequest, Skill } from "@Common/dtos/global.dtos";

export interface GetProformaRequestBySkillRequest {
    skillId: string;
}

export interface GetProformaRequestBySkillResponse {
    request: ProformaRequest;
    skills: Skill[];
    category: Category;
    city: City;
}
