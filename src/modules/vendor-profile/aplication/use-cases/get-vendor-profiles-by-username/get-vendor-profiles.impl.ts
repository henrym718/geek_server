import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";
import { GetVendorProfilesRequest, GetVendorProfilesResponse } from "./get-vendor-profiles.dto";
import { IGetVendorProfilesUseCase } from "./get-vendor-profiles.use-case";
import { inject, injectable } from "inversify";
import { VENDOR_PROFILE_SYMBOLS } from "@VendorProfile/infraestructure/container/vendor-profile.symbols";
import { IdVO } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";

@injectable()
export class GetVendorProfilesUseCase implements IGetVendorProfilesUseCase {
    constructor(
        @inject(VENDOR_PROFILE_SYMBOLS.VendorProfileRepository)
        private readonly vendorProfileRepository: IVendorProfilesRepository
    ) {}
    async execute(data: GetVendorProfilesRequest): Promise<GetVendorProfilesResponse[]> {
        const vendorId = IdVO.create(data.vendorId);
        const reponse = await this.vendorProfileRepository.findByVendorId(vendorId.getValue());

        if (!reponse) {
            throw HttpException.badRequest("Vendor profile not found");
        }

        return reponse.map(({ vendorProfile, skills, category }) => ({
            id: vendorProfile.id.getValue(),
            tittle: vendorProfile.title.getValue(),
            aboutme: vendorProfile.aboutme.getValue(),
            isActive: vendorProfile.isActive,
            createdAt: vendorProfile.createdAt,
            updatedAt: vendorProfile.updatedAt,
            category: {
                id: category.id.getValue(),
                name: category.name.getValue(),
            },
            skills: skills.map((skill) => ({
                id: skill.id.getValue(),
                name: skill.name.getValue(),
            })),
        }));
    }
}
