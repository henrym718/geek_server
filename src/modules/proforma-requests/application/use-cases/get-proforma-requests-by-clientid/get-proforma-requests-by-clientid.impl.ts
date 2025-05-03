import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { GetProformaRequestsByClientIdResponse, GetProformaRequestsByClientIdRequest } from "./get-proforma-requests-by-clientid.dto";
import { IGetProformaRequestsByClientUseCase } from "./get-proforma-requests-by-clientid.use-case";
import { inject, injectable } from "inversify";
import { IdVO, StatusRequestVO } from "@Core/value-objects";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";

@injectable()
export class GetProformaRequestByClientIdUseCase implements IGetProformaRequestsByClientUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.ProformaRequestRepository)
        private readonly proformaRequestsRepository: IProformaRequestsRepository
    ) {}

    async execute(data: GetProformaRequestsByClientIdRequest): Promise<GetProformaRequestsByClientIdResponse[]> {
        const clientIdVO = IdVO.create(data.clientId);
        const statusVO = StatusRequestVO.fromPlainText(data.status);
        const proformaRequests = await this.proformaRequestsRepository.findAllByClientId(clientIdVO.getValue(), statusVO);
        if (proformaRequests.length === 0) return [];

        return proformaRequests.map(({ proformaRequest, skills, category, city }) => ({
            request: {
                id: proformaRequest.id.getValue(),
                title: proformaRequest.title.getValue(),
                budget: proformaRequest.budget?.getValue() ?? 0,
                budgetUnit: proformaRequest.budgetUnit?.getValue() ?? "",
                quotation: proformaRequest.quotation ?? false,
                projectType: proformaRequest.projectType.getValue(),
                projectLength: proformaRequest.projectLength.getValue(),
                projectWorkload: proformaRequest.projectWorkload.getValue(),
                description: proformaRequest.description.getValue(),
                countResponses: proformaRequest.countResponses,
                status: proformaRequest.status.getValue(),
                createdAt: proformaRequest.createdAt,
            },
            category: {
                id: category.id.getValue(),
                name: category.name.getValue(),
            },
            skills: skills.map((skill) => ({
                id: skill.id.getValue(),
                name: skill.name.getValue(),
            })),
            city: {
                id: city.id.getValue(),
                name: city.name.getValue(),
            },
        }));
    }
}
