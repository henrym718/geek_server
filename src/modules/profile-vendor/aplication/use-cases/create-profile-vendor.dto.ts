export interface ReqCreateProfileVendorDto {
    tittle: string;
    skills: string[];
    aboutme: string;
    vendorId: string;
    categoryId: string;
}

export interface ResCreateProfileVendorDto {
    detail: string;
}
