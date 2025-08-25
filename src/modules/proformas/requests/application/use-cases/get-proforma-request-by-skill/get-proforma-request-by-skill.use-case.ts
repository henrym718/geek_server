import { GetProformaRequestBySkillRequest, GetProformaRequestBySkillResponse } from "./get-proforma-request-by-skill.dto";

export interface IGetProformaRequestBySkillUseCase {
    execute(request: GetProformaRequestBySkillRequest): Promise<GetProformaRequestBySkillResponse[]>;
}
