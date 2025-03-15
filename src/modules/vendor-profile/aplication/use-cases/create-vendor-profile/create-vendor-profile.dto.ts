export interface ReqCreateVendorProfileDto {
    tittle: string;
    skills: string[];
    aboutme: string;
    vendorId: string;
    categoryId: string;
}

export interface ResCreateVendorProfileDto {
    detail: string;
}
