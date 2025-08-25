import { inject, injectable } from "inversify";
import { ReqCanceledProformaRequest, ResCanceledProformaRequest } from "./canceled-proforma-request.dto";
import { ICanceledProformaRequestUseCase } from "./canceled-proforma-request.use-case";
import { IProformaRequestsRepository } from "modules/proformas/requests/application/repositories/proforma-requests.repository";
import { IdVO } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";
import { IProformaResponseRepository } from "modules/proformas/response/application/repositories/proforma-response.repository";
import { ProformaResponse } from "@Core/entities/proforma-response";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";

/**
 * @class CanceledProformaRequestUseCase
 * @description Clase encargada de gestionar la cancelación de solicitudes de proforma y el rechazo de sus respuestas asociadas.
 */
@injectable()
export class CanceledProformaRequestUseCase implements ICanceledProformaRequestUseCase {
    /**
     * @constructor
     * @param {IProformaRequestsRepository} proformaRequestsRepository - Repositorio de solicitudes de proforma.
     * @param {IProformaResponseRepository} proformaResponseRepository - Repositorio de respuestas de proforma.
     */
    constructor(
        @inject(SHARED_SYMBOLS.ProformaRequestRepository)
        private readonly proformaRequestsRepository: IProformaRequestsRepository,

        @inject(SHARED_SYMBOLS.ProformaResponseRepository)
        private readonly proformaResponseRepository: IProformaResponseRepository
    ) {}

    /**
     * @method execute
     * @description Realiza el proceso de cancelación de una solicitud de proforma, validando la existencia y propiedad de la solicitud,
     * marcándola como cancelada y rechazando todas las respuestas asociadas. Posteriormente, actualiza la información en la base de datos.     * @param {ReqCanceledProformaRequest} data - Datos de la solicitud de cancelación.
     * @returns {Promise<ResCanceledProformaRequest>} - Resultado de la cancelación.
     */
    async execute(data: ReqCanceledProformaRequest): Promise<ResCanceledProformaRequest> {
        // Validación de IDs y obtención de la solicitud de proforma
        const clientId = IdVO.create(data.clientId);
        const requestId = IdVO.create(data.proformaRequestId);
        const proformaRequest = await this.proformaRequestsRepository.findById(requestId.getValue());

        // Manejo de errores si la solicitud no existe o el cliente no es el propietario
        if (!proformaRequest) {
            throw HttpException.badRequest("Proforma request not found");
        }
        if (!proformaRequest.clientId.equals(clientId)) {
            throw HttpException.badRequest("Client is not the owner of the proforma request");
        }

        // Marca la solicitud como cancelada
        proformaRequest.annulled();

        // Rechaza todas las respuestas asociadas a la solicitud
        const responses = await this.proformaResponseRepository.findAllByRequestId(requestId.getValue());
        this.rejectProformaResponses(responses);

        // Actualiza la solicitud y las respuestas en la base de datos
        await this.proformaRequestsRepository.update(proformaRequest);
        await this.proformaResponseRepository.updateMany(responses.map(response => response.proformaResponse));

        // Retorna un mensaje de éxito
        return { details: "Proforma request canceled successfully" };
    }

    /**
     * @private
     * @method rejectProformaResponses
     * @description Marca las respuestas de proforma como rechazadas.
     * @param {Array<{ proformaResponse: ProformaResponse }>} responses - Array de respuestas a rechazar.
     */
    private rejectProformaResponses(responses: { proformaResponse: ProformaResponse }[]): void {
        responses.forEach(response => response.proformaResponse.rejected());
    }
}
