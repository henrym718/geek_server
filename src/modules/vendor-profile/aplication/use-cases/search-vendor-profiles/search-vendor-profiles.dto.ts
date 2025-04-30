import { Pagination } from "@Common/dtos/global.dtos";

export type SearchRequest = {
    order?: "asc" | "desc";
    city?: string;
    skills?: string;
    page?: number;
    query?: string;
    categoryId?: string;
    limit?: number;
};

export interface SearchResponse {
    pagination: Pagination;
    results: {
        id: string;
        firstName: string;
        lastName: string;
        photo: string;
        city: string;
        title: string;
    }[];
}
