export interface GetVendorProfilesRequest {
    vendorId: string;
}

export interface GetVendorProfilesResponse {
    id: string;
    tittle: string;
    aboutme: string;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    category: {
        id: string;
        name: string;
    };
    skills: {
        id: string;
        name: string;
    }[];
}
