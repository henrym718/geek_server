import { SearchRequest, SearchResponse } from "./search-suggestions.dto";

export interface ISearchSuggestionsUseCase {
    execute(data: SearchRequest): Promise<SearchResponse[]>;
}
