import { ProformaResponse } from "@Core/entities/proforma-response";
import { Vendor } from "@Core/entities/vendor";
import { VendorProfile } from "@Core/entities/profile-vendor";
import { IRepository } from "@Shared/interfaces/repository";
import { User } from "@Core/entities/user";
import { Skill } from "@Core/entities/skill";
import { City } from "@Core/entities/city";

export interface ProformaResponseWithMetadata {
    proformaResponse: ProformaResponse;
    user: User;
    vendor: Vendor;
    vendorProfile: VendorProfile;
    skills: Skill[];
    city: City;
}

export interface IProformaResponseRepository extends IRepository<ProformaResponse> {
    findByProformaRequestIdAndProfileVendorId(proformaRequestId: string, profileVendorId: string): Promise<boolean>;
    findAllByRequestId(requestId: string): Promise<ProformaResponseWithMetadata[]>;
    updateMany(proformaResponses: ProformaResponse[]): Promise<void>;
    findByRequestIdAndProfileVendorId(requestId: string, profileVendorId: string): Promise<ProformaResponse | null>;
}
