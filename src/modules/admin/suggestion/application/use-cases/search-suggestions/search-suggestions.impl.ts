import { inject, injectable } from "inversify";
import { ISuggestionRepository } from "../../repositories/suggestion.repository";
import { SearchResponse } from "./search-suggestions.dto";
import { ISearchSuggestionsUseCase } from "./search-suggestions.use-case";
import { SUGGESTIONS_SYMBOLS } from "modules/admin/suggestion/infraestructure/container/suggestion.symbols";

/**
 * @class SearchSuggestionsUseCase
 * @description Caso de uso para la búsqueda de sugerencias basadas en un texto de búsqueda.
 */
@injectable()
export class SearchSuggestionsUseCase implements ISearchSuggestionsUseCase {
    /**
     * @constructor
     * @param {ISuggestionRepository} suggestionRepository - Repositorio de sugerencias inyectado.
     */
    constructor(
        @inject(SUGGESTIONS_SYMBOLS.SuggestionRepository)
        private readonly suggestionRepository: ISuggestionRepository
    ) {}

    /**
     * @method execute
     * @description Realiza la búsqueda de sugerencias basándose en el texto proporcionado, con un límite de resultados.
     * @param {SearchRequest} data - Objeto que contiene el texto de búsqueda y el límite opcional.
     * @returns {Promise<SearchResponse[]>} - Lista de sugerencias encontradas.
     */
    async execute(): Promise<SearchResponse[]> {
        // Realiza la búsqueda de sugerencias en el repositorio utilizando el texto de búsqueda y el límite
        const suggestions = await this.suggestionRepository.getSuggestionsBySearchText();

        // Mapea los resultados obtenidos en el formato requerido
        return suggestions.map(({ suggestions, skills }) => ({
            suggestions: suggestions.text.getValue(),
            skillId: skills.id.getValue(),
            skillName: skills.name.getValue(),
        }));
    }
}
