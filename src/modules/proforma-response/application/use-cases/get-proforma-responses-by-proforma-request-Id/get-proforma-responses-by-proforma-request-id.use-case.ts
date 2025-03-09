import { ReqGetProformaResponsesByRequestIdDto, ResGetProformaResponsesByRequestIdDto } from "./get-proforma-responses-by-proforma-request-id.dto";

export interface IGetProformaResponsesByRequestIdUseCase {
    execute(data: ReqGetProformaResponsesByRequestIdDto): Promise<ResGetProformaResponsesByRequestIdDto[]>;
}
