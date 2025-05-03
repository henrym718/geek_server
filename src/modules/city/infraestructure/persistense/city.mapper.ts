import { City } from "@Core/entities/city";
import { TextVO, IdVO } from "@Core/value-objects";
import { Prisma, City as PrismaCity } from "@prisma/client";

export class CityMapper {
    public static toPersistence(city: City): Prisma.CityCreateInput {
        return {
            id: city.id.getValue(),
            name: city.name.getValue(),
        };
    }

    public static toDomain(city: PrismaCity): City {
        return City.reconstitute({
            id: IdVO.create(city.id),
            name: TextVO.create("name", city.name),
        });
    }
}
