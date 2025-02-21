import { RoleEnum } from "@Core/value-objects";

export interface ReqCreateVendorDto {
    id: string;
    firstName: string;
    lastName: string;
    photo: string;
    phone: string;
    city: string;
}

export interface ResCreateVendorDto {
    id: string;
    email: string;
    role: string;
    profileCompleted: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    isActive: boolean;
    vendorProfile: VendorProfile;
}

interface VendorProfile {
    firstName: string;
    lastName: string;
    photo: string;
    phone: string;
    city: string;
}
