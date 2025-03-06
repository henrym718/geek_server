import { inject, injectable } from "inversify";
import { IProformaResponseRepository } from "../../repositories/proforma-response.repository";
import { ReqCreateProformaResponseDto, ResCreateProformaResponseDto } from "./create-proforma-response.dto";
import { ICreateProformaResponseUseCase } from "./create-proforma-response.use-case";
import { PROFORMA_RES_SYMBOLS } from "modules/proforma-response/infraestructure/container/proforma-reponse.symbols";
import { ProformaResponse } from "@Core/entities/proforma-response";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { IdVO, PriceVO, StatusVO, TextVO } from "@Core/value-objects";
import { StatusEnum } from "@Core/value-objects/status.vo";
import { PROFORMA_REQ_SYMBOLS } from "@ProformaRequests/infraestructure/container/proforma-requests.symbols";
import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { HttpException } from "@Common/exceptions/http.exception";
import { VENDOR_PROFILE_SYMBOLS } from "@VendorProfile/infraestructure/container/vendor-profile.symbols";
import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";

@injectable()
export class CreateProformaResponseUseCase implements ICreateProformaResponseUseCase {
    constructor(
        @inject(PROFORMA_RES_SYMBOLS.ProformaResponseRepository) private readonly proformaResponseRepository: IProformaResponseRepository,
        @inject(VENDOR_PROFILE_SYMBOLS.VendorProfileRepository) private readonly vendorProfileRepository: IVendorProfilesRepository,
        @inject(PROFORMA_REQ_SYMBOLS.ProformaRequestsRepository) private readonly proformaRequestsRepository: IProformaRequestsRepository,
        @inject(SHARED_SYMBOLS.UUIDService) private readonly idService: IUUIDService
    ) {}

    async execute(data: ReqCreateProformaResponseDto): Promise<ResCreateProformaResponseDto> {
        const { profileVendorId, proformaRequestId, budget, message } = data;

        const proformaResponseId = IdVO.create(this.idService.generateUUID());
        const proformaResponseBudget = PriceVO.create(budget);
        const proformaResponseMessage = TextVO.create("message", message);
        const profileVendor_Id = IdVO.create(profileVendorId);
        const proformaRequest_Id = IdVO.create(proformaRequestId);

        const [profileVendorFound, proformaRequestFound] = await Promise.all([
            this.vendorProfileRepository.findById(profileVendor_Id.getValue()),
            this.proformaRequestsRepository.findById(proformaRequest_Id.getValue()),
        ]);

        if (!profileVendorFound) throw HttpException.notFound("Profile_Vendor not found");
        if (!proformaRequestFound) throw HttpException.notFound("Proforma not found");

        const newProformaResponse = ProformaResponse.create({
            id: proformaResponseId,
            budget: proformaResponseBudget,
            message: proformaResponseMessage,
            profileVendorId: profileVendor_Id,
            proformaRequestId: proformaRequest_Id,
            status: StatusVO.fromEnum(StatusEnum.PENDING),
        });

        await this.proformaResponseRepository.create(newProformaResponse);

        return { details: "Proforma Response Created" };
    }
}
