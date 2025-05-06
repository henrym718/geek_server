import { IdVO } from "@Core/value-objects";
import { IProformaResponseRepository, ProformaResponseWithMetadata } from "../../repositories/proforma-response.repository";
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

    private proformaResponseMapper(data: ProformaResponseWithMetadata[]): GetProformaResponsesByRequestIdResponse[] {
        return data.map(({ proformaResponse, vendor, vendorProfile, user, skills, city }) => ({
            proformaResponse: {
                id: proformaResponse.id.getValue(),
                budget: proformaResponse.budget ? proformaResponse.budget.getValue() : undefined,
                message: proformaResponse.message.getValue(),
                status: proformaResponse.status.getValue(),
            },
            user: {
                createdAt: user.createdAt,
                username: user.username.getValue(),
                id: user.id.getValue(),
            },
            vendor: {
                photo: vendor.photo?.getValue() || "",
                phone: vendor.phone.getValue(),
                city: vendor.city.getValue(),
                firstName: vendor.firstName.getValue(),
                lastName: vendor.lastName.getValue(),
            },
            vendorProfile: {
                aboutme: vendorProfile.aboutme.getValue(),
                title: vendorProfile.title.getValue(),
            },
            skills: skills.map((skill) => ({
                id: skill.id.getValue(),
                name: skill.name.getValue(),
            })),
            city: {
                id: city.id.getValue(),
                name: city.name.getValue(),
            },
        }));
    }
}
