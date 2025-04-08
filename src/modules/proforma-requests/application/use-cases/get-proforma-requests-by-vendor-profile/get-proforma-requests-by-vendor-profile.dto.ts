export interface GetByVendorProfilerRequest {
    vendorProfileId: string;
    vendorId: string;
}

export interface GetByVendorProfilerResponse {
    id: string;
    title: string;
    description: string;
    budget: number;
    status: string;
    createdAt: Date | undefined;
    skills: {
        id: string;
        name: string;
    }[];
    categoty: {
        id: string;
        name: string;
    };
}
