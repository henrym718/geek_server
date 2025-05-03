import { VendorProfile } from "@Core/entities/profile-vendor";
import { Vendor } from "@Core/entities/vendor";
import { SearchRequest } from "../use-cases/search-vendor-profiles/search-vendor-profiles.dto";
import { Skill } from "@Core/entities/skill";
import { Category } from "@Core/entities/category";
import { User } from "@Core/entities/user";
import { City } from "@Core/entities/city";

export interface IVendorProfilesRepository {
    create(entity: VendorProfile): Promise<void>;
    findById(id: string): Promise<VendorProfile | null>;
    findByIdWithDetails(
        id: string
    ): Promise<{ user: User; vendor: Vendor; vendorProfile: VendorProfile; skills: Skill[]; category: Category; city: City } | null>;
    findByIdWithSkillsId(id: string): Promise<VendorProfile | null>;
    searchVendorProfiles(filter: Required<SearchRequest>): Promise<{
        data: Array<{ vendorProfile: VendorProfile; vendor: Vendor; city: City }>;
        results: number;
    }>;
    findByVendorId(vendorId: string): Promise<{ vendor: Vendor; vendorProfile: VendorProfile; city: City }[] | null>;
}
