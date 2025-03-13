export interface GetByVendorProfilerRequest {
    vendorProfileId: string;
    vendorId: string;
}

export interface GetByVendorProfilerResponse {
    id: string;
    description: string;
    budget: number;
    status: string;
    createdAt: Date | undefined;
    skills: SKills[];
    categoty: Category;
}

type SKills = {
    id: string;
    name: string;
};

type Category = {
    id: string;
    name: string;
};
