import { Category, City, ProformaRequest, Skill } from "@Common/dtos/global.dtos";

export interface GetByVendorProfilerRequest {
    vendorProfileId: string;
    vendorId: string;
}

export interface GetByVendorProfilerResponse {
    request: ProformaRequest;
    skills: Skill[];
    category: Category;
    city: City;
}
