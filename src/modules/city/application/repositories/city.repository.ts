import { City } from "@Core/entities/city";

export interface ICityRepository {
    findAll(): Promise<City[]>;
}
