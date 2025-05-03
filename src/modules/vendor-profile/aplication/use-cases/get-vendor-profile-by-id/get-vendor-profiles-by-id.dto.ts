import { Category, City, Skill, User, Vendor, VendorProfile } from "@Common/dtos/global.dtos";

export interface GetVendorProfileRequest {
    profileId: string;
}

export interface GetVendorProfileResponse {
    user: Pick<User, "id" | "username">;
    vendor: Pick<Vendor, "firstName" | "lastName" | "photo" | "phone" | "city">;
    vendorProfile: Pick<VendorProfile, "title" | "aboutme" | "createdAt">;
    category: Category;
    skills: Skill[];
    city: City;
}
