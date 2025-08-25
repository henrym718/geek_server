import { registerControllers, registerUseCases } from "@Common/utils/container-utils";
import { Container } from "inversify";
import { CITY_SYMBOLS } from "./city.symbols";
import { GetAllCitiesUseCase } from "modules/admin/city/application/use-cases/get-all-cities/get-all-cities.impl";
import { CityController } from "modules/admin/city/presentation/city.controller";

export const createCityContainer = (rootContainer: Container) => {
    registerUseCases(rootContainer, [{ symbol: CITY_SYMBOLS.GetAllCities, implementation: GetAllCitiesUseCase }]);
    registerControllers(rootContainer, [CityController]);
};
