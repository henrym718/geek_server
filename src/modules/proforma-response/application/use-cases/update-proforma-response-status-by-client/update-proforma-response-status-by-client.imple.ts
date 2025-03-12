import { inject, injectable } from "inversify";
import { UpdateStatusByClientRequest, UpdateStatusByClientResponse } from "./update-proforma-response-status-by-client.dto";
import { IUpdateProformaResponseStatusByClientUseCase } from "./update-proforma-response-status-by-client.use-case";
import { PROFORMA_RES_SYMBOLS } from "modules/proforma-response/infraestructure/container/proforma-reponse.symbols";
import { IProformaResponseRepository } from "../../repositories/proforma-response.repository";
import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { PROFORMA_REQ_SYMBOLS } from "@ProformaRequests/infraestructure/container/proforma-requests.symbols";
import { IdVO, StatusVO } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";
import { StatusEnum } from "@Core/value-objects/status.vo";

@injectable()
export class UpdateProformaResponseStatusByClientUseCase implements IUpdateProformaResponseStatusByClientUseCase {
    constructor(
        @inject(PROFORMA_RES_SYMBOLS.ProformaResponseRepository)
        private readonly proformaResponseRepository: IProformaResponseRepository,

        @inject(PROFORMA_REQ_SYMBOLS.ProformaRequestsRepository)
        private readonly proformaRequestRepository: IProformaRequestsRepository
    ) {}
    async execute(data: UpdateStatusByClientRequest): Promise<UpdateStatusByClientResponse> {
        const proformaRequestId = IdVO.create(data.proformaRequestId);
        const proformaResponseId = IdVO.create(data.proformaResponseId);
        const clientId = IdVO.create(data.clientId);
        const status = StatusVO.fromPlainText(data.newStatus);

        const proformaRequest = await this.proformaRequestRepository.findById(proformaRequestId.getValue());
        if (!proformaRequest) throw HttpException.notFound("ProformaRquest no encontrada");
        if (!proformaRequest.clientId.equals(clientId)) throw HttpException.notFound("ProformaRequest no pertenece al cliente");
        if (proformaRequest.status.getValue() !== StatusEnum.ACTIVE) throw HttpException.notFound("ProformaRequest is not active");

        const response = await this.proformaResponseRepository.findById(proformaResponseId.getValue());
        if (!response) throw HttpException.notFound("ProformaResponse no encontrada");
        if (!response.proformaRequestId.equals(proformaRequestId)) throw HttpException.notFound("ProformaResponse no pertenece a la ProformaRequest");

        if (status.getValue() === StatusEnum.ACCEPTED) {
            const updatedResponse = response.accepted();
            await this.proformaResponseRepository.update(updatedResponse);
            const otherResponses = (await this.proformaResponseRepository.findAllByRequestId(proformaRequestId.getValue())).filter(
                (res) => !res.proformaResponse.id.equals(proformaResponseId) && res.proformaResponse.status.getValue() !== StatusEnum.REJECTED
            );

            await this.proformaResponseRepository.updateMany(otherResponses.map((res) => res.proformaResponse.rejected()));
            const updatedRequest = proformaRequest.finished();
            await this.proformaRequestRepository.update(updatedRequest);
        }

        if (status.getValue() === StatusEnum.REJECTED) {
            const updatedResponse = response.rejected();
            await this.proformaResponseRepository.update(updatedResponse);
        }

        return { details: "Proforma Response updated" };
    }
}
