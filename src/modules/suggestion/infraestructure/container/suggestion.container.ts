import { Container } from "inversify";
import { ISuggestionRepository } from "modules/suggestion/application/repositories/suggestion.repository";
import { SUGGESTIONS_SYMBOLS } from "./suggestion.symbols";
import { SuggestionPrismaRepository } from "../persistence/suggestion-prisma.repository";
import { ISearchSuggestionsUseCase } from "modules/suggestion/application/use-cases/search-suggestions/search-suggestions.use-case";
import { SearchSuggestionsUseCase } from "modules/suggestion/application/use-cases/search-suggestions/search-suggestions.impl";
import { SuggestionController } from "modules/suggestion/presentation/suggestion.controller";

export const suggestionContainer = new Container();

suggestionContainer.bind<ISuggestionRepository>(SUGGESTIONS_SYMBOLS.SuggestionRepository).to(SuggestionPrismaRepository);
suggestionContainer.bind<ISearchSuggestionsUseCase>(SUGGESTIONS_SYMBOLS.SearchSuggestions).to(SearchSuggestionsUseCase);
suggestionContainer.bind<SuggestionController>(SuggestionController).toSelf();
