import { Router } from "express";
import { suggestionContainer } from "../infraestructure/container/suggestion.container";
import { SuggestionController } from "./suggestion.controller";

export const suggestionRoutes = Router();
const suggetionController = suggestionContainer.get(SuggestionController);

suggestionRoutes.get("/", suggetionController.searchSuggetions);
