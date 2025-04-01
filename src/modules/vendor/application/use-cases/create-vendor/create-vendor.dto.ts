import { Vendor } from "@Core/entities/vendor";

export interface CreateVendorRequest {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    photo?: string;
}

export interface CreateVendorResponse {
    vendor: Vendor;
}
