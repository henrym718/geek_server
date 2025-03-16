import { inject, injectable } from "inversify";
import { ISuggestionRepository } from "../../repositories/suggestion.repository";
import { SearchRequest, SearchResponse } from "./search-suggestions.dto";
import { ISearchSuggestionsUseCase } from "./search-suggestions.use-case";
import { SUGGESTIONS_SYMBOLS } from "modules/suggestion/infraestructure/container/suggestion.symbols";
import { TextVO } from "@Core/value-objects";

@injectable()
export class SearchSuggestionsUseCase implements ISearchSuggestionsUseCase {
    constructor(
        @inject(SUGGESTIONS_SYMBOLS.SuggestionRepository)
        private readonly suggestionRepository: ISuggestionRepository
    ) {}
    async execute(data: SearchRequest): Promise<SearchResponse[]> {
        const searchText = TextVO.create("searchText", data.searchText);
        const suggestions = await this.suggestionRepository.getSuggestionsBySearchText(searchText.getValue());

        if (!suggestions) return [];

        return suggestions.map((suggestion) => ({
            suggestions: suggestion.text.getValue(),
            skillId: suggestion.skillId.getValue(),
            categoryId: suggestion.categoryId.getValue(),
        }));
    }
}
