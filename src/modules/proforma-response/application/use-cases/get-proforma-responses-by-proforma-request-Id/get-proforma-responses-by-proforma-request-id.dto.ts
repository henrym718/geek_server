import { City, ProformaResponse, Skill, User, Vendor, VendorProfile } from "@Common/dtos/global.dtos";

export interface GetProformaResponsesByRequestIdRequest {
    requestId: string;
}

export interface GetProformaResponsesByRequestIdResponse {
    proformaResponse: Pick<ProformaResponse, "id" | "budget" | "message" | "status">;
    user: Pick<User, "id" | "createdAt" | "username">;
    vendor: Pick<Vendor, "firstName" | "lastName" | "photo" | "phone" | "city">;
    vendorProfile: Pick<VendorProfile, "aboutme" | "title">;
    skills: Skill[];
    city: City;
}
