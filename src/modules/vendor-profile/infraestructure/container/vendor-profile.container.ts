import { Container } from "inversify";
import { VENDOR_PROFILE_SYMBOLS } from "./vendor-profile.symbols";
import { CreateVendorProfileUseCase } from "@VendorProfile/aplication/use-cases/create-vendor-profile/create-vendor-profile.impl";
import { VendorProfileController } from "@VendorProfile/presentation/vendor-profile.controller";
import { SearchVendorProfilesUseCase } from "@VendorProfile/aplication/use-cases/search-vendor-profiles/search-vendor-profiles.impl";
import { GetVendorProfileByIdUseCase } from "@VendorProfile/aplication/use-cases/get-vendor-profile-by-id/get-vendor-profiles-by-id.impl";
import { registerUseCases, registerControllers } from "@Common/utils/container-utils";

export function configureVendorProfileContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    registerUseCases(container, [
        { symbol: VENDOR_PROFILE_SYMBOLS.CreateVendorProfile, implementation: CreateVendorProfileUseCase },
        { symbol: VENDOR_PROFILE_SYMBOLS.SearchVendorProfiles, implementation: SearchVendorProfilesUseCase },
        { symbol: VENDOR_PROFILE_SYMBOLS.GetVendorProfileById, implementation: GetVendorProfileByIdUseCase },
    ]);

    registerControllers(container, [VendorProfileController]);

    return container;
}
