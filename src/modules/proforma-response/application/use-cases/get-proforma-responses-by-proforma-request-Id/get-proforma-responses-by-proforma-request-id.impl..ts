import { IdVO } from "@Core/value-objects";
import { IProformaResponseRepository, ProformaResponseWithVendor } from "../../repositories/proforma-response.repository";
import { GetProformaResponsesByRequestIdRequest, GetProformaResponsesByRequestIdResponse } from "./get-proforma-responses-by-proforma-request-id.dto";
import { IGetProformaResponsesByRequestIdUseCase } from "./get-proforma-responses-by-proforma-request-id.use-case";
import { inject, injectable } from "inversify";
import { PROFORMA_RES_SYMBOLS } from "modules/proforma-response/infraestructure/container/proforma-reponse.symbols";

@injectable()
export class GetProformaResponsesByRequestIdUseCase implements IGetProformaResponsesByRequestIdUseCase {
    constructor(
        @inject(PROFORMA_RES_SYMBOLS.ProformaResponseRepository)
        private readonly proformaResponseRepository: IProformaResponseRepository
    ) {}

    async execute(data: GetProformaResponsesByRequestIdRequest): Promise<GetProformaResponsesByRequestIdResponse[]> {
        const requestId = IdVO.create(data.requestId);
        const reponses = await this.proformaResponseRepository.findAllByRequestId(requestId.getValue());

        return this.proformaResponseMapper(reponses);
    }

    private proformaResponseMapper(data: ProformaResponseWithVendor[]): GetProformaResponsesByRequestIdResponse[] {
        return data.map(({ proformaResponse, vendor, vendorProfile }) => ({
            proformaResponse: {
                id: proformaResponse.id.getValue(),
                budget: proformaResponse.budget ? proformaResponse.budget.getValue() : undefined,
                message: proformaResponse.message.getValue(),
                status: proformaResponse.status.getValue(),
                createdAt: proformaResponse.updatedAt,
            },
            vendor: {
                id: vendor.id.getValue(),
                firstName: vendor.firstName.getValue(),
                lastName: vendor.lastName.getValue(),
                photo: vendor.photo?.getValue() || "",
                phone: vendor.phone.getValue(),
                city: vendor.city.getValue(),
            },
            vendorProfile: {
                id: vendorProfile.id.getValue(),
                aboutme: vendorProfile.aboutme.getValue(),
                title: vendorProfile.title.getValue(),
                isActive: vendorProfile.isActive,
            },
        }));
    }
}
