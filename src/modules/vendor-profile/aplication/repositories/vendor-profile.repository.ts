import { VendorProfile } from "@Core/entities/profile-vendor";
import { Vendor } from "@Core/entities/vendor";
import { IRepository } from "@Shared/repositories/repository";

export interface VendorWithProfile {
    vendor: Vendor;
    vendorPrfile: VendorProfile;
}
export interface IVendorProfilesRepository extends IRepository<VendorProfile> {}
