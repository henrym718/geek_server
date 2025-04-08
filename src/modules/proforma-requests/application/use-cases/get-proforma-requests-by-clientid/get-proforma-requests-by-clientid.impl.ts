import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { ReqGetProformaRequestsByClientIdDto, ResGetProformaRequestsByClientIdDto } from "./get-proforma-requests-by-clientid.dto";
import { IGetProformaRequestsByClientUseCase } from "./get-proforma-requests-by-clientid.use-case";
import { inject, injectable } from "inversify";
import { IdVO } from "@Core/value-objects";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";

@injectable()
export class GetProformaRequestByClientIdUseCase implements IGetProformaRequestsByClientUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.ProformaRequestRepository)
        private readonly proformaRequestsRepository: IProformaRequestsRepository
    ) {}

    async execute(data: ReqGetProformaRequestsByClientIdDto): Promise<ResGetProformaRequestsByClientIdDto[]> {
        const clientIdVO = IdVO.create(data.clientId);

        const proformaRequests = await this.proformaRequestsRepository.findAllByClientId(clientIdVO.getValue());
        if (proformaRequests.length === 0) return [];

        return proformaRequests.map(({ proformaRequest, skills, category }) => ({
            id: proformaRequest.id.getValue(),
            title: proformaRequest.title.getValue(),
            budget: proformaRequest.budget.getValue(),
            scope: proformaRequest.scope.getValue(),
            description: proformaRequest.description.getValue(),
            status: proformaRequest.status.getValue(),
            createdAt: proformaRequest.createdAt,
            categoty: {
                id: category.id.getValue(),
                name: category.name.getValue(),
            },
            skills: skills.map((skill) => ({
                id: skill.id.getValue(),
                name: skill.name.getValue(),
            })),
        }));
    }
}
