export type SearchRequest = {
    order?: "asc" | "desc";
    city?: string;
    skills?: string;
    page?: number;
    query?: string;
    categoryName?: string;
    limit?: number;
};

export interface SearchResponse {
    results: number;
    currentPage: number;
    pages: number;
    nextPage: number | null;
    prevPage: number | null;
    data: VendorProfileView[];
}

interface VendorProfileView {
    vendor: {
        id: string;
        firstName: string;
        lastName: string;
        city: string;
        phone: string;
        photo: string;
    };
    vendorProfile: {
        id: string;
        title: string;
        aboutme: string;
        createdAt: Date | undefined;
    };
    skills: {
        name: string;
    };
}
