import { RoleEnum } from "@Core/value-objects/role.vo";

export interface ReqGetCurrentAccountDTO {
    id: string;
}

export interface ResGetCurrentAccountDTO {
    id: string;
    email: string;
    role: RoleEnum;
    profileComplete: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    isActive: boolean;
    clientProfile?: ClientProfile;
    vendorProfile?: VendorProfile;
}

interface ClientProfile {
    firstName: string;
    lastName: string;
    photo?: string | null;
    city: string;
}

interface VendorProfile {
    firstName: string;
    lastName: string;
    photo?: string;
    phone: string;
    city: string;
}
