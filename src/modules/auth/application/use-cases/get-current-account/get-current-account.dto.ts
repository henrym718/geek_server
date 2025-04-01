export interface ReqGetCurrentAccountDTO {
    email: string;
}

export interface ResGetCurrentAccountDTO {
    user: {
        id: string;
        email: string;
        role: string;
        profileCompleted: boolean;
        createdAt: Date;
        updatedAt: Date | null;
        isActive: boolean;
    };
    clientProfile?: {
        id: string;
        firstName: string;
        lastName: string;
        photo?: string | null;
        city: string;
    };
    vendorProfile?: {
        id: string;
        firstName: string;
        lastName: string;
        photo?: string | null;
        city: string;
    };
}
