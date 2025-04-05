export interface ReqGetCurrentAccountDTO {
    email: string;
}

export interface ResGetCurrentAccountDTO {
    user: {
        id: string;
        email: string;
        role: string;
        username: string;
        profileCompleted: boolean;
        createdAt: Date;
        updatedAt: Date | null;

        isActive: boolean;
    };
    client?: {
        id: string;
        firstName: string;
        lastName: string;
        photo?: string | null;
        city: string;
    };
    vendor?: {
        id: string;
        firstName: string;
        lastName: string;
        photo?: string | null;
        city: string;
    };
}
