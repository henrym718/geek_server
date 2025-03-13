import { ReqGetProformaRequestsByClientIdDto, ResGetProformaRequestsByClientIdDto } from "./get-proforma-requests-by-clientid.dto";

export interface IGetProformaRequestsByClientUseCase {
    execute(data: ReqGetProformaRequestsByClientIdDto): Promise<ResGetProformaRequestsByClientIdDto[]>;
}
