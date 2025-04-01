export interface RegisterLocalRequest {
    role: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    city: string;
    phone: string;
    photo?: string;
}

export interface RegisterLocalResponse {
    accessToken: string;
    user: {
        id: string;
        email: string;
        role: string;
        profileCompleted: boolean;
        createdAt: Date;
        updatedAt: Date | null;
        isActive: boolean;
    };
    vendor?: {
        id: string;
        firstName: string;
        lastName: string;
        city: string;
        phone: string;
        photo: string | undefined;
    };
    client?: {
        id: string;
        firstName: string;
        lastName: string;
        city: string;
        phone: string;
        photo: string | undefined;
    };
}
