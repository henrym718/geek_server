import { IdVO } from "@Core/value-objects";
import { CheckProformaResponseExistsResponse, CheckProformaResponseExistsRequest } from "./chek-proforma-response-exists.dto";
import { ICheckProformaResponseExistsUseCase } from "./chek-proforma-response-exists.use-case";
import { IProformaResponseRepository } from "../../repositories/proforma-response.repository";
import { inject, injectable } from "inversify";
import { PROFORMA_RES_SYMBOLS } from "modules/proforma-response/infraestructure/container/proforma-reponse.symbols";

@injectable()
export class CheckProformaReaponseExistsUseCase implements ICheckProformaResponseExistsUseCase {
    constructor(@inject(PROFORMA_RES_SYMBOLS.ProformaResponseRepository) private readonly proformaResponseRepository: IProformaResponseRepository) {}

    async execute(request: CheckProformaResponseExistsRequest): Promise<CheckProformaResponseExistsResponse> {
        const { profileVendorId, proformaRequestId } = request;

        const profileVendorIdVO = IdVO.create(profileVendorId);
        const proformaRequestIdVO = IdVO.create(proformaRequestId);

        const proformaResponse = await this.proformaResponseRepository.findByRequestIdAndProfileVendorId(
            proformaRequestIdVO.getValue(),
            profileVendorIdVO.getValue()
        );

        return { exists: !!proformaResponse };
    }
}
