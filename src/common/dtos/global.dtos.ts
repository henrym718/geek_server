export interface User {
    id: string;
    username: string;
    email: string;
    role: string;
    profileCompleted: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    photo?: string | null;
    phone: string;
    city: string;
}

export interface Vendor {
    id: string;
    firstName: string;
    lastName: string;
    photo?: string | null;
    phone: string;
    city: string;
}

export interface VendorProfile {
    id: string;
    title: string;
    aboutme: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProformaRequest {
    id: string;
    title: string;
    description: string;
    budget?: number;
    budgetUnit?: string;
    quotation?: boolean;
    scope: string;
    projectType: string;
    projectLength: string;
    projectWorkload: string;
    status: string;
    createdAt?: Date;
}

export interface ProformaResponse {
    id: string;
    budget?: number;
    message: string;
    status: string;
    createdAt?: Date;
}

export interface Skill {
    id: string;
    name: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface Group {
    id: string;
    name: string;
}

export interface Suggestion {
    id: string;
    text: string;
}

export interface AccessToken {
    accessToken: string;
}

export interface ExistsResponse {
    exists: boolean;
}
