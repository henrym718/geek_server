export interface GetGroupWithCategoriesRequest {
    id: string;
}

export interface GetGroupWithCategoriesResponse {
    id: string;
    name: string;
    categories: {
        id: string;
        name: string;
    }[];
}
