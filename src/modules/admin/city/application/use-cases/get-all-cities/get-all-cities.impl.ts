import { inject, injectable } from "inversify";
import { IGetAllCitiesUseCase } from "./get-all-cities.use-case";
import { GetAllCitiesResponse } from "./get-all-cities.dto";
import { ICityRepository } from "../../repositories/city.repository";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";

@injectable()
export class GetAllCitiesUseCase implements IGetAllCitiesUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.CityRepository)
        private readonly cityRepository: ICityRepository
    ) {}

    async execute(): Promise<GetAllCitiesResponse[]> {
        const cities = await this.cityRepository.findAll();
        return cities.map((city) => ({
            id: city.id.getValue(),
            name: city.name.getValue(),
        }));
    }
}
