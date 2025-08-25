import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { Suggestion } from "@Core/entities/suggestion";
import { ISuggestionRepository } from "../../application/repositories/suggestion.repository";
import { SuggestionMapper } from "./suggestion.mapper";
import { Skill } from "@Core/entities/skill";
import { SkillMapper } from "modules/admin/skill/infraestructure/persistence/skill.mapper";

export class SuggestionPrismaRepository implements ISuggestionRepository {
    private get db() {
        return PrismaBootstrap.prisma;
    }
    async getSuggestionsBySearchText(): Promise<{ suggestions: Suggestion; skills: Skill }[]> {
        const suggestions = await this.db.suggestion.findMany({
            include: { skill: true },
        });
        return suggestions.map(({ skill, ...suggestions }) => ({
            suggestions: SuggestionMapper.toDomain(suggestions),
            skills: SkillMapper.toDomain(skill),
        }));
    }
}
