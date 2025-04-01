import { Container } from "inversify";
import { VENDOR_PROFILE_SYMBOLS } from "./vendor-profile.symbols";
import { ICreateVendorProfileUseCase } from "@VendorProfile/aplication/use-cases/create-vendor-profile/create-vendor-profile.use-case";
import { CreateVendorProfileUseCase } from "@VendorProfile/aplication/use-cases/create-vendor-profile/create-vendor-profile.impl";
import { VendorProfileController } from "@VendorProfile/presentation/vendor-profile.controller";

import { ISearchVendorProfilesUseCase } from "@VendorProfile/aplication/use-cases/search-vendor-profiles/search-vendor-profiles.use-case";
import { SearchVendorProfilesUseCase } from "@VendorProfile/aplication/use-cases/search-vendor-profiles/search-vendor-profiles.impl";

export function configureVendorProfileContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    container.bind<ICreateVendorProfileUseCase>(VENDOR_PROFILE_SYMBOLS.CreateVendorProfile).to(CreateVendorProfileUseCase);
    container.bind<ISearchVendorProfilesUseCase>(VENDOR_PROFILE_SYMBOLS.SearchVendorProfiles).to(SearchVendorProfilesUseCase);
    container.bind<VendorProfileController>(VendorProfileController).toSelf();

    return container;
}
