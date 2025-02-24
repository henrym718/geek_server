export interface ReqCreateClientDTO {
    id: string;
    firstName: string;
    lastName: string;
    photo?: string;
    city: string;
}

export interface ResCreateClientDTO {
    id: string;
    email: string;
    role: string;
    profileCompleted: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    isActive: boolean;
    clientProfile: ClientProfile;
}

interface ClientProfile {
    firstName: string;
    lastName: string;
    photo: string | null;
    city: string;
}
