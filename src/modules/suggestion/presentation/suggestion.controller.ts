import { NextFunction, Request, Response } from "express";
import { SearchSuggestionsUseCase } from "../application/use-cases/search-suggestions/search-suggestions.impl";
import { inject, injectable } from "inversify";
import { SUGGESTIONS_SYMBOLS } from "../infraestructure/container/suggestion.symbols";
import { HttpResponse } from "@Common/response/http.response";
import { SearchRequest } from "../application/use-cases/search-suggestions/search-suggestions.dto";

@injectable()
export class SuggestionController {
    constructor(
        @inject(SUGGESTIONS_SYMBOLS.SearchSuggestions)
        private readonly searchSuggestionsUseCase: SearchSuggestionsUseCase
    ) {
        this.searchSuggetions = this.searchSuggetions.bind(this);
    }

    async searchSuggetions(req: Request, res: Response, next: NextFunction) {
        try {
            const data: SearchRequest = req.body;
            const response = await this.searchSuggestionsUseCase.execute(data);
            HttpResponse.success(res, response);
        } catch (error) {
            next(error);
        }
    }
}
