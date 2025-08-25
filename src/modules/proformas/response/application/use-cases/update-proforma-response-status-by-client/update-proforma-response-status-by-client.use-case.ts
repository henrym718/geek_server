import { UpdateStatusByClientResponse, UpdateStatusByClientRequest } from "./update-proforma-response-status-by-client.dto";

export interface IUpdateProformaResponseStatusByClientUseCase {
    execute(data: UpdateStatusByClientRequest): Promise<UpdateStatusByClientResponse>;
}
