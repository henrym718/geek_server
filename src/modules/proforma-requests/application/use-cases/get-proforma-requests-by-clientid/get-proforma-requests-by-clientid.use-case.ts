import { GetProformaRequestsByClientIdResponse, GetProformaRequestsByClientIdRequest } from "./get-proforma-requests-by-clientid.dto";

export interface IGetProformaRequestsByClientUseCase {
    execute(data: GetProformaRequestsByClientIdRequest): Promise<GetProformaRequestsByClientIdResponse[]>;
}
