import { inject, injectable } from "inversify";
import { ReqCanceledProformaRequest, ResCanceledProformaRequest } from "./canceled-proforma-request.dto";
import { ICanceledProformaRequestUseCase } from "./canceled-proforma-request.use-case";
import { PROFORMA_REQ_SYMBOLS } from "@ProformaRequests/infraestructure/container/proforma-requests.symbols";
import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { IdVO } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";
import { PROFORMA_RES_SYMBOLS } from "modules/proforma-response/infraestructure/container/proforma-reponse.symbols";
import { IProformaResponseRepository } from "modules/proforma-response/application/repositories/proforma-response.repository";
import { ProformaResponse } from "@Core/entities/proforma-response";

@injectable()
export class CanceledProformaRequestUseCase implements ICanceledProformaRequestUseCase {
    constructor(
        @inject(PROFORMA_REQ_SYMBOLS.ProformaRequestsRepository)
        private readonly proformaRequestsRepository: IProformaRequestsRepository,

        @inject(PROFORMA_RES_SYMBOLS.ProformaResponseRepository)
        private readonly proformaResponseRepository: IProformaResponseRepository
    ) {}

    async execute(data: ReqCanceledProformaRequest): Promise<ResCanceledProformaRequest> {
        const clientId = IdVO.create(data.clientId);
        const requestId = IdVO.create(data.proformaRequestId);

        const proformaRequest = await this.proformaRequestsRepository.findById(requestId.getValue());

        if (!proformaRequest) {
            throw HttpException.badRequest("Proforma request not found");
        }

        if (!proformaRequest.clientId.equals(clientId)) {
            throw HttpException.badRequest("Client is not the owner of the proforma request");
        }

        proformaRequest.canceled();

        const responses = await this.proformaResponseRepository.findAllByRequestId(requestId.getValue());
        this.rejectProformaResponses(responses);

        await this.proformaRequestsRepository.update(proformaRequest);
        await this.proformaResponseRepository.updateMany(responses.map((response) => response.proformaResponse));

        return { details: "Proforma request canceled successfully" };
    }

    private rejectProformaResponses(responses: { proformaResponse: ProformaResponse }[]): void {
        responses.forEach((response) => response.proformaResponse.rejected());
    }
}
