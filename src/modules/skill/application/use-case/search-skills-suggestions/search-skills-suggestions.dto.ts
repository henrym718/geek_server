export interface SearchSkillsRequest {
    searchText: string;
    limit: number;
}

export interface SearchSkillsResponse {
    id: string;
    suggestions: string;
}
