export interface ReqCreateProformaResponseDto {
    budget: number | undefined;
    message: string;
    profileVendorId: string;
    proformaRequestId: string;
    vendorId: string;
}

export interface ResCreateProformaResponseDto {
    details: string;
}
