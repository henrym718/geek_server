import { GetAllCitiesResponse } from "./get-all-cities.dto";

export interface IGetAllCitiesUseCase {
    execute(): Promise<GetAllCitiesResponse[]>;
}
