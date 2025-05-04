export interface ReqCreateVendorProfileDto {
    title: string;
    skills: string[];
    aboutme: string;
    vendorId: string;
    categoryId: string;
    bannerImage: string;
}

export interface ResCreateVendorProfileDto {
    detail: string;
}
