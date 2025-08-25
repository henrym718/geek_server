import { inject, injectable } from "inversify";
import { UpdateStatusByClientRequest, UpdateStatusByClientResponse } from "./update-proforma-response-status-by-client.dto";
import { IUpdateProformaResponseStatusByClientUseCase } from "./update-proforma-response-status-by-client.use-case";
import { IProformaResponseRepository } from "../../repositories/proforma-response.repository";
import { IProformaRequestsRepository } from "modules/proformas/requests/application/repositories/proforma-requests.repository";
import { IdVO, StatusResponseVO } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";
import { StatusResponseEnum } from "@Core/value-objects/status-response.vo";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { StatusRequestEnum } from "@Core/value-objects/status-request.vo";

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
        const status = StatusResponseVO.fromPlainText(data.newStatus);

        const [request, response] = await Promise.all([
            await this.proformaRequestRepository.findById(proformaRequestId.getValue()),
            await this.proformaResponseRepository.findById(proformaResponseId.getValue()),
        ]);

        if (!request) throw HttpException.notFound("ProformaRquest no encontrada");
        if (!request.clientId.equals(clientId)) throw HttpException.notFound("request no pertenece al cliente");
        if (request.status.getValue() !== StatusRequestEnum.ACTIVE) throw HttpException.notFound("ProformaRequest is not active");
        if (!response) throw HttpException.notFound("ProformaResponse no encontrada");
        if (!response.proformaRequestId.equals(proformaRequestId))
            throw HttpException.notFound("ProformaResponse no pertenece a la ProformaRequest");

        if (status.getValue() === StatusResponseEnum.REJECTED) {
            const updatedResponse = response.rejected();
            await this.proformaResponseRepository.update(updatedResponse);
        }

        if (status.getValue() === StatusResponseEnum.ACCEPTED) {
            const updatedResponse = response.accepted();
            await this.proformaResponseRepository.update(updatedResponse);
            const otherResponses = (await this.proformaResponseRepository.findAllByRequestId(proformaRequestId.getValue())).filter(
                res =>
                    !res.proformaResponse.id.equals(proformaResponseId) &&
                    res.proformaResponse.status.getValue() !== StatusResponseEnum.REJECTED
            );
            await this.proformaResponseRepository.updateMany(otherResponses.map(res => res.proformaResponse.rejected()));
            const updatedRequest = request.matched();
            await this.proformaRequestRepository.update(updatedRequest);
        }

        return { details: "Proforma Response updated" };
    }
}
