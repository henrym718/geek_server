import { VendorProfile } from "@Core/entities/profile-vendor";
import { Vendor } from "@Core/entities/vendor";
import { IRepository } from "@Shared/repositories/repository";
import { SearchRequest } from "../use-cases/search-vendor-profiles/search-vendor-profiles.dto";
import { Skill } from "@Core/entities/skill";

export interface IVendorProfilesRepository extends IRepository<VendorProfile> {
    findByIdWithSkillsId(id: string): Promise<VendorProfile | null>;
    searchVendorProfiles(filter: Required<SearchRequest>): Promise<{
        vendorProfiles: Array<{ vendorProfile: VendorProfile; vendor: Vendor; skills: Skill[] }>;
        results: number;
    }>;
}
