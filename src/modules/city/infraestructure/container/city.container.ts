import { registerControllers, registerUseCases } from "@Common/utils/container-utils";
import { Container } from "inversify";
import { CITY_SYMBOLS } from "./city.symbols";
import { GetAllCitiesUseCase } from "modules/city/application/use-cases/get-all-cities/get-all-cities.impl";
import { CityController } from "modules/city/presentation/city.controller";

export const createCityContainer = (parentContainer: Container): Container => {
    const container = new Container();
    container.parent = parentContainer;

    registerUseCases(container, [{ symbol: CITY_SYMBOLS.GetAllCities, implementation: GetAllCitiesUseCase }]);
    registerControllers(container, [CityController]);

    return container;
};
