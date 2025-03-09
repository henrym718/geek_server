import { ReqGetProformaRequestsByClientIdDto, ResGetProformaRequestsByClientIdDto } from "./get-proforma-requests-by-clientid.dto";

export interface IGetProformaRequestsByClientIdUseCase {
    execute(data: ReqGetProformaRequestsByClientIdDto): Promise<ResGetProformaRequestsByClientIdDto[]>;
}
