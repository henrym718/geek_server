import { inject, injectable } from "inversify";
import { UpdateStatusByClientRequest, UpdateStatusByClientResponse } from "./update-proforma-response-status-by-client.dto";
import { IUpdateProformaResponseStatusByClientUseCase } from "./update-proforma-response-status-by-client.use-case";
import { IProformaResponseRepository } from "../../repositories/proforma-response.repository";
import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { IdVO, StatusVO } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";
import { StatusEnum } from "@Core/value-objects/status.vo";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";

@injectable()
export class UpdateProformaResponseStatusByClientUseCase implements IUpdateProformaResponseStatusByClientUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.ProformaResponseRepository)
        private readonly proformaResponseRepository: IProformaResponseRepository,

        @inject(SHARED_SYMBOLS.ProformaRequestRepository)
        private readonly proformaRequestRepository: IProformaRequestsRepository
    ) {}
    async execute(data: UpdateStatusByClientRequest): Promise<UpdateStatusByClientResponse> {
        const proformaRequestId = IdVO.create(data.proformaRequestId);
        const proformaResponseId = IdVO.create(data.proformaResponseId);
        const clientId = IdVO.create(data.clientId);
        const status = StatusVO.fromPlainText(data.newStatus);

        const [request, response] = await Promise.all([
            await this.proformaRequestRepository.findById(proformaRequestId.getValue()),
            await this.proformaResponseRepository.findById(proformaResponseId.getValue()),
        ]);

        if (!request) throw HttpException.notFound("ProformaRquest no encontrada");
        if (!request.clientId.equals(clientId)) throw HttpException.notFound("request no pertenece al cliente");
        if (request.status.getValue() !== StatusEnum.ACTIVE) throw HttpException.notFound("ProformaRequest is not active");
        if (!response) throw HttpException.notFound("ProformaResponse no encontrada");
        if (!response.proformaRequestId.equals(proformaRequestId)) throw HttpException.notFound("ProformaResponse no pertenece a la ProformaRequest");

        if (status.getValue() === StatusEnum.REJECTED) {
            const updatedResponse = response.rejected();
            await this.proformaResponseRepository.update(updatedResponse);
        }

        if (status.getValue() === StatusEnum.ACCEPTED) {
            const updatedResponse = response.accepted();
            await this.proformaResponseRepository.update(updatedResponse);
            const otherResponses = (await this.proformaResponseRepository.findAllByRequestId(proformaRequestId.getValue())).filter(
                (res) => !res.proformaResponse.id.equals(proformaResponseId) && res.proformaResponse.status.getValue() !== StatusEnum.REJECTED
            );
            await this.proformaResponseRepository.updateMany(otherResponses.map((res) => res.proformaResponse.rejected()));
            const updatedRequest = request.finished();
            await this.proformaRequestRepository.update(updatedRequest);
        }

        return { details: "Proforma Response updated" };
    }
}
