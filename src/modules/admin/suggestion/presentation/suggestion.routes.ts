import { Router } from "express";
import { SuggestionController } from "./suggestion.controller";
import { ContainerBootstrap, IDENTIFIERS } from "@Bootstraps/container.bootstrap";

export function configureSuggestionRoutes(): Router {
    const suggestionRoutes = Router();
    const suggetionController = ContainerBootstrap.getModuleContainer(IDENTIFIERS.Suggestion).get(SuggestionController);

    suggestionRoutes.get("/", suggetionController.searchSuggetions);

    return suggestionRoutes;
}
