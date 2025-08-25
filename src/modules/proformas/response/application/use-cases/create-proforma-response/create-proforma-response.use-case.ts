import { ReqCreateProformaResponseDto, ResCreateProformaResponseDto } from "./create-proforma-response.dto";
export interface ICreateProformaResponseUseCase {
    execute(data: ReqCreateProformaResponseDto): Promise<ResCreateProformaResponseDto>;
}
