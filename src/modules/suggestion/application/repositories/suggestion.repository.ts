import { Skill } from "@Core/entities/skill";
import { Suggestion } from "@Core/entities/suggestion";

export interface ISuggestionRepository {
    getSuggestionsBySearchText(): Promise<{ suggestions: Suggestion; skills: Skill }[]>;
}
