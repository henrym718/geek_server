import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { Suggestion } from "@Core/entities/suggestion";
import { ISuggestionRepository } from "modules/suggestion/application/repositories/suggestion.repository";
import { SuggestionMapper } from "./suggestion.mapper";

export class SuggestionPrismaRepository implements ISuggestionRepository {
    private get db() {
        return PrismaBootstrap.prisma;
    }

    async getSuggestionsBySearchText(searchText: string): Promise<Suggestion[]> {
        const suggestions = await this.db.suggestion.findMany({
            where: {
                text: { contains: searchText, mode: "insensitive" },
            },
            include: { category: { select: { id: true } }, skill: { select: { id: true } } },
        });
        return suggestions.map((suggestion) => SuggestionMapper.toDomain(suggestion));
    }
}
