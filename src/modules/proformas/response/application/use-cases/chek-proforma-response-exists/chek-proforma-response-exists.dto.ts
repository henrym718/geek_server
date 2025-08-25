export interface CheckProformaResponseExistsRequest {
    proformaRequestId: string;
    profileVendorId: string;
}

export interface CheckProformaResponseExistsResponse {
    exists: boolean;
}
