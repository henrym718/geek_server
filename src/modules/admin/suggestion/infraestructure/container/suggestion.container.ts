import { Container } from "inversify";
import { SUGGESTIONS_SYMBOLS } from "./suggestion.symbols";
import { SuggestionPrismaRepository } from "../persistence/suggestion-prisma.repository";
import { SearchSuggestionsUseCase } from "../../application/use-cases/search-suggestions/search-suggestions.impl";
import { SuggestionController } from "../../presentation/suggestion.controller";
import { registerUseCases, registerControllers } from "@Common/utils/container-utils";

export function configureSuggestionContainer(rootContainer: Container) {
    registerUseCases(rootContainer, [
        { symbol: SUGGESTIONS_SYMBOLS.SuggestionRepository, implementation: SuggestionPrismaRepository },
        { symbol: SUGGESTIONS_SYMBOLS.SearchSuggestions, implementation: SearchSuggestionsUseCase },
    ]);
    registerControllers(rootContainer, [SuggestionController]);
}
