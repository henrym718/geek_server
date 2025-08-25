import { inject, injectable } from "inversify";
import { GetProformaRequestBySkillRequest, GetProformaRequestBySkillResponse } from "./get-proforma-request-by-skill.dto";
import { IGetProformaRequestBySkillUseCase } from "./get-proforma-request-by-skill.use-case";
import { IdVO } from "@Core/value-objects";
import { IProformaRequestsRepository } from "modules/proformas/requests/application/repositories/proforma-requests.repository";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";

@injectable()
export class GetProformaRequestBySkillUseCase implements IGetProformaRequestBySkillUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.ProformaRequestRepository)
        private readonly proformaRequestRepository: IProformaRequestsRepository
    ) {}

    async execute(request: GetProformaRequestBySkillRequest): Promise<GetProformaRequestBySkillResponse[]> {
        const skillId = IdVO.create(request.skillId);

        const response = await this.proformaRequestRepository.findBySkill(skillId.getValue());

        return response.map(({ proformaRequest, category, city, skills }) => ({
            request: {
                id: proformaRequest.id.getValue(),
                title: proformaRequest.title.getValue(),
                description: proformaRequest.description.getValue(),
                budget: proformaRequest.budget?.getValue(),
                budgetUnit: proformaRequest.budgetUnit?.getValue(),
                quotation: proformaRequest.quotation,
                projectType: proformaRequest.projectType.getValue(),
                projectLength: proformaRequest.projectLength.getValue(),
                projectWorkload: proformaRequest.projectWorkload.getValue(),
                countResponses: proformaRequest.countResponses,
                status: proformaRequest.status.getValue(),
                createdAt: proformaRequest.createdAt,
            },
            skills: skills.map(skill => ({
                id: skill.id.getValue(),
                name: skill.name.getValue(),
            })),
            category: {
                id: category.id.getValue(),
                name: category.name.getValue(),
            },
            city: {
                id: city.id.getValue(),
                name: city.name.getValue(),
            },
        }));
    }
}
