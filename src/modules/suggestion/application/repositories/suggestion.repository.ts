import { Category } from "@Core/entities/category";
import { Skill } from "@Core/entities/skill";
import { Suggestion } from "@Core/entities/suggestion";

export interface ISuggestionRepository {
    getSuggestionsBySearchText(searchText: string, limit: number): Promise<{ suggestions: Suggestion; category: Category; skills: Skill }[]>;
}
