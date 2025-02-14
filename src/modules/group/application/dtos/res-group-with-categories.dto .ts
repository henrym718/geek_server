export interface ResGroupWithCategoriesDTO {
    id: string;
    name: string;
    categories: {
        id: string;
        name: string;
    }[];
}
