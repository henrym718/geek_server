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
    projectType: string;
    projectLength: string;
    projectWorkload: string;
    countResponses: number;
    status: string;
    createdAt?: Date;
}

export interface ProformaResponse {
    id: string;
    budget?: number;
    message: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Skill {
    id: string;
    name: string;
}

export interface Category {
    id: string;
    name: string;
}

export interface City {
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

export interface Message {
    id: string;
    message: string;
    chatId: string;
    senderId: string;
    createdAt: Date;
}

export interface Chat {
    id: string;
    clientId: string;
    vendorId: string;
    createdAt: Date;
}

export interface Pagination {
    results: number;
    currentPage: number;
    pages: number;
    nextPage: number | null;
    prevPage: number | null;
}
