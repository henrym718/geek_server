import { Suggestion } from "@Core/entities/suggestion";

export interface ISuggestionRepository {
    getSuggestionsBySearchText(searchText: string): Promise<Suggestion[]>;
}
