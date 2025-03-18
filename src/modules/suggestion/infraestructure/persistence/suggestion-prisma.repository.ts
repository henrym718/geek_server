import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { Suggestion } from "@Core/entities/suggestion";
import { ISuggestionRepository } from "modules/suggestion/application/repositories/suggestion.repository";
import { SuggestionMapper } from "./suggestion.mapper";
import { Category } from "@Core/entities/category";
import { Skill } from "@Core/entities/skill";
import { CategoryMapper } from "@Category/infraestructure/persistence/category.mapper";
import { SkillMapper } from "@Skill/infraestructure/persistence/skill.mapper";

export class SuggestionPrismaRepository implements ISuggestionRepository {
    private get db() {
        return PrismaBootstrap.prisma;
    }
    async getSuggestionsBySearchText(searchText: string, limit: number): Promise<{ suggestions: Suggestion; category: Category; skills: Skill }[]> {
        const suggestions = await this.db.suggestion.findMany({
            where: { text: { contains: searchText, mode: "insensitive" } },
            include: { category: true, skill: true },
            take: limit,
        });
        return suggestions.map(({ skill, category, ...suggestions }) => ({
            suggestions: SuggestionMapper.toDomain(suggestions),
            category: CategoryMapper.toDomain(category),
            skills: SkillMapper.toDomain(skill),
        }));
    }
}
