import { SearchSkillsRequest, SearchSkillsResponse } from "./search-skills-suggestions.dto";

export interface ISearchSkillsSuggestionsUseCase {
    execute(data: SearchSkillsRequest): Promise<SearchSkillsResponse[]>;
}
