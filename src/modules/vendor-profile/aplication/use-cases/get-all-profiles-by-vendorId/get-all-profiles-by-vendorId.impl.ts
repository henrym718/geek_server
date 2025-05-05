import { inject, injectable } from "inversify";
import { IGetAllProfilesByVendorIdUseCase } from "./get-all-profiles-by-vendorId.use-case";
import { GetAllProfilesByVendorIdRequest, GetAllProfilesByVendorIdResponse } from "./get-all-profiles-by-vendorId.dto";
import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { HttpException } from "@Common/exceptions/http.exception";

@injectable()
export class GetAllProfilesByVendorIdUseCase implements IGetAllProfilesByVendorIdUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.VendorProfileRepository)
        private readonly vendorProfileRepository: IVendorProfilesRepository
    ) {}
    async execute(request: GetAllProfilesByVendorIdRequest): Promise<GetAllProfilesByVendorIdResponse[]> {
        const { vendorId } = request;

        const profiles = await this.vendorProfileRepository.findByVendorId(vendorId);

        if (!profiles) throw HttpException.notFound("No profiles found");

        console.log(profiles);

        return profiles.map(({ vendor, vendorProfile, city }) => ({
            id: vendorProfile.id.getValue(),
            firstName: vendor.firstName.getValue(),
            lastName: vendor.lastName.getValue(),
            photo: vendor.photo?.getValue() ?? "",
            city: city.name.getValue(),
            title: vendorProfile.title.getValue(),
            bannerImage: vendorProfile.bannerImage.getValue(),
        }));
    }
}
