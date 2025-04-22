import { ProformaResponsePrismaRepository } from "modules/proforma-response/infraestructure/persistence/proforma-reponse-prisma.repository";
import { IGetAcceptedProformaResponsesUseCase } from "./get-accepted-proforma-responses";
import { GetAcceptedResponsesRequest, GetAcceptedResponsesResponse } from "./get-accepted-proforma-responses.dto";

export class GetAcceptedProformaResponsesUseCase implements IGetAcceptedProformaResponsesUseCase {
    constructor(private readonly proformaResponseRepository: ProformaResponsePrismaRepository) {}
    execute(request: GetAcceptedResponsesRequest): Promise<GetAcceptedResponsesResponse[]> {
        throw new Error("Method not implemented.");
    }
}
