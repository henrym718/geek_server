import { Category, ProformaRequest, Skill } from "@Common/dtos/global.dtos";

export interface GetProformaRequestsByClientIdRequest {
    clientId: string;
    status: string;
}

export interface GetProformaRequestsByClientIdResponse {
    request: ProformaRequest;
    skills: Skill[];
    category: Category;
}
