import { ProformaResponse } from "@Core/entities/proforma-response";
import { Vendor } from "@Core/entities/vendor";
import { VendorProfile } from "@Core/entities/profile-vendor";

import { IRepository } from "@Shared/interfaces/repository";

export interface ProformaResponseWithVendor {
    proformaResponse: ProformaResponse;
    vendor: Vendor;
    vendorProfile: VendorProfile;
}

export interface IProformaResponseRepository extends IRepository<ProformaResponse> {
    findByProformaRequestIdAndProfileVendorId(proformaRequestId: string, profileVendorId: string): Promise<boolean>;
    findAllByRequestId(requestId: string): Promise<ProformaResponseWithVendor[]>;
    updateMany(proformaResponses: ProformaResponse[]): Promise<void>;
    findByRequestIdAndProfileVendorId(requestId: string, profileVendorId: string): Promise<ProformaResponse | null>;
}
