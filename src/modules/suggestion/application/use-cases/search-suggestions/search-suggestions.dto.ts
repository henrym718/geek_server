export type SearchRequest = {
    searchText: string;
    limit: number;
};
export type SearchResponse = {
    suggestions: string;
    categoryName: string;
    query: string;
};
