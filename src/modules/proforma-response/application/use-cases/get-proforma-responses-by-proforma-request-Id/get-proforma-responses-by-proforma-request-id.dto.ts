import { ProformaResponse, Vendor, VendorProfile } from "@Common/dtos/global.dtos";

export interface GetProformaResponsesByRequestIdRequest {
    requestId: string;
}

export interface GetProformaResponsesByRequestIdResponse {
    proformaResponse: ProformaResponse;
    vendor: Vendor;
    vendorProfile: VendorProfile;
}
