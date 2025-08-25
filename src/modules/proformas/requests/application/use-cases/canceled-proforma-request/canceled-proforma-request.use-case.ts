import { ReqCanceledProformaRequest, ResCanceledProformaRequest } from "./canceled-proforma-request.dto";

export interface ICanceledProformaRequestUseCase {
    execute(data: ReqCanceledProformaRequest): Promise<ResCanceledProformaRequest>;
}
