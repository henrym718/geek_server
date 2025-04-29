import { SearchResponse } from "./search-suggestions.dto";

export interface ISearchSuggestionsUseCase {
    execute(): Promise<SearchResponse[]>;
}
