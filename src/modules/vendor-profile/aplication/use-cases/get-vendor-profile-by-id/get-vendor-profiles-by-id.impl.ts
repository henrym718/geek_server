import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";
import { GetVendorProfileRequest, GetVendorProfileResponse } from "./get-vendor-profiles-by-id.dto";
import { IGetVendorProfileByIdUseCase } from "./get-vendor-profiles-by-id.use-case";
import { inject, injectable } from "inversify";
import { VENDOR_PROFILE_SYMBOLS } from "@VendorProfile/infraestructure/container/vendor-profile.symbols";
import { IdVO } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";

@injectable()
export class GetVendorProfileByIdUseCase implements IGetVendorProfileByIdUseCase {
    constructor(
        @inject(VENDOR_PROFILE_SYMBOLS.VendorProfileRepository)
        private readonly vendorProfileRepository: IVendorProfilesRepository
    ) {}
    async execute(data: GetVendorProfileRequest): Promise<GetVendorProfileResponse> {
        const profileId = IdVO.create(data.profileId);
        const reponse = await this.vendorProfileRepository.findByIdWithDetails(profileId.getValue());

        if (!reponse) {
            throw HttpException.badRequest("Vendor profile not found");
        }

        const { user, vendor, vendorProfile, skills, category, city } = reponse;

        return {
            user: {
                id: user.id.getValue(),
                username: user.username.getValue(),
            },
            vendor: {
                firstName: vendor.firstName.getValue(),
                lastName: vendor.lastName.getValue(),
                photo: vendor.photo?.getValue(),
                phone: vendor.phone.getValue(),
                city: vendor.city.getValue(),
            },
            vendorProfile: {
                title: vendorProfile.title.getValue(),
                aboutme: vendorProfile.aboutme.getValue(),
                createdAt: vendorProfile.createdAt,
            },
            category: {
                id: category.id.getValue(),
                name: category.name.getValue(),
            },
            skills: skills.map((skill) => ({
                id: skill.id.getValue(),
                name: skill.name.getValue(),
            })),
            city: {
                id: city.id.getValue(),
                name: city.name.getValue(),
            },
        };
    }
}
