import { inject, injectable } from "inversify";
import { IGetAllCitiesUseCase } from "../application/use-cases/get-all-cities/get-all-cities.use-case";
import { CITY_SYMBOLS } from "../infraestructure/container/city.symbols";
import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "@Common/response/http.response";

@injectable()
export class CityController {
    constructor(@inject(CITY_SYMBOLS.GetAllCities) private readonly getAllCitiesUseCase: IGetAllCitiesUseCase) {
        this.getAllCities = this.getAllCities.bind(this);
    }

    async getAllCities(req: Request, res: Response, next: NextFunction) {
        try {
            const cities = await this.getAllCitiesUseCase.execute();
            return HttpResponse.success(res, cities);
        } catch (error) {
            next(error);
        }
    }
}
