import { ReqCreateProformaRequestDto, ResCreateProformaRequestDto } from "./create-proforma-requests.dto";

export interface ICreateProformaRequestsUseCase {
    execute(data: ReqCreateProformaRequestDto): Promise<ResCreateProformaRequestDto>;
}
