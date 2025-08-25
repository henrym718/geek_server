import { Router } from "express";
import { ContainerBootstrap, IDENTIFIERS } from "@Bootstraps/container.bootstrap";
import { CityController } from "./city.controller";

export function configureCityRouter(): Router {
    const router = Router();

    const cityContainer = ContainerBootstrap.getModuleContainer(IDENTIFIERS.City);
    const cityController = cityContainer.get(CityController);

    router.get("/", cityController.getAllCities);

    return router;
}
