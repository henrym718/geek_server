import { inject, injectable } from "inversify";
import { SearchSkillsRequest, SearchSkillsResponse } from "./search-skills-suggestions.dto";
import { ISearchSkillsSuggestionsUseCase } from "./search-skills-suggestions.use-case";
import { SKILL_SYMBOLS } from "@Skill/infraestructure/container/skill.symbols";
import { ISkillRepository } from "@Skill/application/repositories/skill.repository";
import { TextVO } from "@Core/value-objects";
import { EnvBootstrap } from "@Bootstraps/env.bootstrap";

/**
 * @class SearchSkillsSuggestionsUseCase
 * @description Clase encargada de obtener sugerencias de habilidades a partir de un texto de búsqueda.
 */
@injectable()
export class SearchSkillsSuggestionsUseCase implements ISearchSkillsSuggestionsUseCase {
    /**
     * @constructor
     * @param {ISkillRepository} skillRepository - Repositorio de habilidades.
     */
    constructor(
        @inject(SKILL_SYMBOLS.SkillRepository)
        private readonly skillRepository: ISkillRepository
    ) {}

    /**
     * @method execute
     * @description Realiza la búsqueda de sugerencias de habilidades basándose en el texto de búsqueda proporcionado,
     * aplicando un límite de resultados. Devuelve una lista de habilidades sugeridas.
     * @param {SearchSkillsRequest} data - Datos de la solicitud de búsqueda de habilidades.
     * @returns {Promise<SearchSkillsResponse[]>} - Lista de sugerencias de habilidades.
     */
    async execute(data: SearchSkillsRequest): Promise<SearchSkillsResponse[]> {
        // Crea el valor de búsqueda como un objeto de valor (VO)
        const searchText = TextVO.create("searchText", data.searchText);

        // Determina el límite de sugerencias, usando un valor por defecto si no se especifica
        const limit = Number(data.limit) || EnvBootstrap.ENV.LIMIT_PER_QUERY_PROFILES;

        // Realiza la búsqueda de sugerencias en el repositorio
        const searchSuggestions = await this.skillRepository.findAllBySearchText(searchText.getValue(), limit);

        // Mapea los resultados obtenidos en el formato esperado
        const skills = searchSuggestions.map((item) => ({
            id: item.id.getValue(),
            suggestions: item.name.getValue(),
        }));

        //Retorna un listado de sugerencias de skills
        return skills;
    }
}
