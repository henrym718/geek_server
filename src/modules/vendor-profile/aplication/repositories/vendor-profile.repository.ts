import { VendorProfile } from "@Core/entities/profile-vendor";
import { Vendor } from "@Core/entities/vendor";
import { IRepository } from "@Shared/interfaces/repository";
import { SearchRequest } from "../use-cases/search-vendor-profiles/search-vendor-profiles.dto";
import { Skill } from "@Core/entities/skill";
import { Category } from "@Core/entities/category";

export interface IVendorProfilesRepository extends IRepository<VendorProfile> {
    findByIdWithSkillsId(id: string): Promise<VendorProfile | null>;
    searchVendorProfiles(filter: Required<SearchRequest>): Promise<{
        data: Array<{ vendorProfile: VendorProfile; vendor: Vendor; skills: Skill[] }>;
        results: number;
    }>;
    findByVendorId(vendorId: string): Promise<{ vendorProfile: VendorProfile; skills: Skill[]; category: Category }[] | null>;
}
