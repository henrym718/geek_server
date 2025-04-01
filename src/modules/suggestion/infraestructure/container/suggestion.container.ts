import { Container } from "inversify";
import { SUGGESTIONS_SYMBOLS } from "./suggestion.symbols";
import { SuggestionPrismaRepository } from "../persistence/suggestion-prisma.repository";
import { SearchSuggestionsUseCase } from "modules/suggestion/application/use-cases/search-suggestions/search-suggestions.impl";
import { SuggestionController } from "modules/suggestion/presentation/suggestion.controller";
import { registerUseCases, registerControllers } from "@Common/utils/container-utils";

export function configureSuggestionContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    registerUseCases(container, [
        { symbol: SUGGESTIONS_SYMBOLS.SuggestionRepository, implementation: SuggestionPrismaRepository },
        { symbol: SUGGESTIONS_SYMBOLS.SearchSuggestions, implementation: SearchSuggestionsUseCase },
    ]);
    registerControllers(container, [SuggestionController]);

    return container;
}
