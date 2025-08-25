import { GetProformaResponsesByRequestIdRequest, GetProformaResponsesByRequestIdResponse } from "./get-proforma-responses-by-proforma-request-id.dto";

export interface IGetProformaResponsesByRequestIdUseCase {
    execute(data: GetProformaResponsesByRequestIdRequest): Promise<GetProformaResponsesByRequestIdResponse[]>;
}
