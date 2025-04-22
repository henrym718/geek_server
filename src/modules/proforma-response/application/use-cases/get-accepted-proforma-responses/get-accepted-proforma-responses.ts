import { GetAcceptedResponsesRequest, GetAcceptedResponsesResponse } from "./get-accepted-proforma-responses.dto";

export interface IGetAcceptedProformaResponsesUseCase {
    execute(request: GetAcceptedResponsesRequest): Promise<GetAcceptedResponsesResponse[]>;
}
