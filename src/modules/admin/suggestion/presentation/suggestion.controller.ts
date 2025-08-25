import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { SUGGESTIONS_SYMBOLS } from "../infraestructure/container/suggestion.symbols";
import { HttpResponse } from "@Common/response/http.response";
import { ISearchSuggestionsUseCase } from "../application/use-cases/search-suggestions/search-suggestions.use-case";

@injectable()
export class SuggestionController {
    constructor(
        @inject(SUGGESTIONS_SYMBOLS.SearchSuggestions)
        private readonly searchSuggestionsUseCase: ISearchSuggestionsUseCase
    ) {
        this.searchSuggetions = this.searchSuggetions.bind(this);
    }

    async searchSuggetions(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.searchSuggestionsUseCase.execute();
            HttpResponse.success(res, response);
        } catch (error) {
            next(error);
        }
    }
}
