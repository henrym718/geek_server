import { inject, injectable } from "inversify";
import { IProformaResponseRepository } from "../../repositories/proforma-response.repository";
import { ReqCreateProformaResponseDto, ResCreateProformaResponseDto } from "./create-proforma-response.dto";
import { ICreateProformaResponseUseCase } from "./create-proforma-response.use-case";
import { ProformaResponse } from "@Core/entities/proforma-response";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { IdVO, PriceVO, StatusResponseVO, TextVO } from "@Core/value-objects";
import { StatusResponseEnum } from "@Core/value-objects/status-response.vo";
import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { HttpException } from "@Common/exceptions/http.exception";
import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";

@injectable()
export class CreateProformaResponseUseCase implements ICreateProformaResponseUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.ProformaResponseRepository) private readonly proformaResponseRepository: IProformaResponseRepository,
        @inject(SHARED_SYMBOLS.VendorProfileRepository) private readonly vendorProfileRepository: IVendorProfilesRepository,
        @inject(SHARED_SYMBOLS.ProformaRequestRepository) private readonly proformaRequestsRepository: IProformaRequestsRepository,
        @inject(SHARED_SYMBOLS.UUIDService) private readonly idService: IUUIDService
    ) {}

    async execute(data: ReqCreateProformaResponseDto): Promise<ResCreateProformaResponseDto> {
        const { vendorId, profileVendorId, proformaRequestId, budget, message } = data;

        const proformaResponseId = IdVO.create(this.idService.generateUUID());
        const proformaResponseBudget = budget ? PriceVO.create(budget) : undefined;
        const proformaResponseMessage = TextVO.create("message", message);
        const profileVendor_Id = IdVO.create(profileVendorId);
        const vendor_Id = IdVO.create(vendorId);
        const proformaRequest_Id = IdVO.create(proformaRequestId);

        const [profileVendorFound, proformaRequestFound, existingResponse] = await Promise.all([
            this.vendorProfileRepository.findById(profileVendor_Id.getValue()),
            this.proformaRequestsRepository.findById(proformaRequest_Id.getValue()),
            this.proformaResponseRepository.findByProformaRequestIdAndProfileVendorId(proformaRequest_Id.getValue(), profileVendor_Id.getValue()),
        ]);

        if (!profileVendorFound) throw HttpException.notFound("Profile_Vendor not found");
        if (!profileVendorFound.vendorId.equals(vendor_Id)) throw HttpException.notFound("You do not own this VendorProfile");
        if (!proformaRequestFound) throw HttpException.notFound("Proforma not found");
        if (existingResponse) throw HttpException.badRequest("You already have a response to this proforma");

        const newProformaResponse = ProformaResponse.create({
            id: proformaResponseId,
            budget: proformaResponseBudget,
            message: proformaResponseMessage,
            profileVendorId: profileVendor_Id,
            proformaRequestId: proformaRequest_Id,
            status: StatusResponseVO.fromEnum(StatusResponseEnum.PENDING),
        });

        await this.proformaResponseRepository.create(newProformaResponse);

        return { details: "Proforma Response Created" };
    }
}
