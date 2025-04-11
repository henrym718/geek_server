import { IdVO } from "@Core/value-objects";
import { IProformaResponseRepository, ProformaResponseWithVendor } from "../../repositories/proforma-response.repository";
import { ReqGetProformaResponsesByRequestIdDto, ResGetProformaResponsesByRequestIdDto } from "./get-proforma-responses-by-proforma-request-id.dto";
import { IGetProformaResponsesByRequestIdUseCase } from "./get-proforma-responses-by-proforma-request-id.use-case";
import { inject, injectable } from "inversify";
import { PROFORMA_RES_SYMBOLS } from "modules/proforma-response/infraestructure/container/proforma-reponse.symbols";

@injectable()
export class GetProformaResponsesByRequestIdUseCase implements IGetProformaResponsesByRequestIdUseCase {
    constructor(
        @inject(PROFORMA_RES_SYMBOLS.ProformaResponseRepository)
        private readonly proformaResponseRepository: IProformaResponseRepository
    ) {}

    async execute(data: ReqGetProformaResponsesByRequestIdDto): Promise<ResGetProformaResponsesByRequestIdDto[]> {
        const requestId = IdVO.create(data.requestId);
        const reponses = await this.proformaResponseRepository.findAllByRequestId(requestId.getValue());

        return this.proformaResponseMapper(reponses);
    }

    private proformaResponseMapper(data: ProformaResponseWithVendor[]): ResGetProformaResponsesByRequestIdDto[] {
        return data.map(({ proformaResponse, vendor, vendorProfile }) => ({
            id: proformaResponse.id.getValue(),
            budget: proformaResponse.budget ? proformaResponse.budget.getValue() : undefined,
            message: proformaResponse.message.getValue(),
            status: proformaResponse.status.getValue(),
            createdAt: proformaResponse.updatedAt,
            vendor: {
                id: vendor.id.getValue(),
                firstName: vendor.firstName.getValue(),
                lastName: vendor.lastName.getValue(),
                photo: vendor.photo?.getValue() ?? "",
            },
            vendorProfile: {
                id: vendorProfile.id.getValue(),
            },
        }));
    }
}
