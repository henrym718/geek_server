import { CheckProformaResponseExistsRequest, CheckProformaResponseExistsResponse } from "./chek-proforma-response-exists.dto";

export interface ICheckProformaResponseExistsUseCase {
    execute(request: CheckProformaResponseExistsRequest): Promise<CheckProformaResponseExistsResponse>;
}
