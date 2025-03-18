import { inject, injectable } from "inversify";
import { ISuggestionRepository } from "../../repositories/suggestion.repository";
import { SearchRequest, SearchResponse } from "./search-suggestions.dto";
import { ISearchSuggestionsUseCase } from "./search-suggestions.use-case";
import { SUGGESTIONS_SYMBOLS } from "modules/suggestion/infraestructure/container/suggestion.symbols";
import { TextVO } from "@Core/value-objects";
import { EnvBootstrap } from "@Bootstraps/env.bootstrap";

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
    async execute(data: SearchRequest): Promise<SearchResponse[]> {
        // Crea un objeto de valor (VO) a partir del texto de búsqueda recibido
        const searchText = TextVO.create("searchText", data.searchText);

        // Determina el límite de resultados a retornar, utilizando un valor por defecto si no se especifica
        const limit = Number(data.limit) || EnvBootstrap.ENV.LIMIT_PER_QUERY_PROFILES;

        // Realiza la búsqueda de sugerencias en el repositorio utilizando el texto de búsqueda y el límite
        const suggestions = await this.suggestionRepository.getSuggestionsBySearchText(searchText.getValue(), limit);

        // Si no se encuentran sugerencias, retorna un arreglo vacío
        if (!suggestions) return [];

        // Mapea los resultados obtenidos en el formato requerido
        return suggestions.map(({ suggestions, category, skills }) => ({
            suggestions: suggestions.text.getValue(),
            query: skills.name.getValue(),
            categoryName: category.name.getValue(),
        }));
    }
}
