import { City } from "@Core/entities/city";
import { ICityRepository } from "modules/admin/city/application/repositories/city.repository";
import { injectable } from "inversify";
import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { CityMapper } from "./city.mapper";

@injectable()
export class CityPrismaRepository implements ICityRepository {
    private get db() {
        return PrismaBootstrap.prisma;
    }

    async findAll(): Promise<City[]> {
        const response = await this.db.city.findMany();
        return response.map(city => CityMapper.toDomain(city));
    }
}
