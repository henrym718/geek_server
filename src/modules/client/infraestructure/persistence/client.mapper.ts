import { Client } from "@Core/entities/client";
import { IdVO, TextVO, UrlVO } from "@Core/value-objects";
import { PhoneVO } from "@Core/value-objects/phone.vo";
import { Prisma, Client as ClientPrisma } from "@prisma/client";

export class ClientMapper {
    public static toPersistence(client: Client): Prisma.ClientUncheckedCreateInput {
        return {
            id: client.id.getValue(),
            firstName: client.firstName.getValue(),
            lastName: client.lastName.getValue(),
            city: client.city.getValue(),
            photo: client.photo?.getValue() ?? null,
            phone: client.phone.getValue(),
        };
    }

    public static toDomain(client: ClientPrisma): Client {
        return Client.reconstitute({
            id: IdVO.create(client.id),
            firstName: TextVO.create("firstName", client.firstName),
            lastName: TextVO.create("lastName", client.lastName),
            city: TextVO.create("city", client.city),
            photo: client.photo ? UrlVO.create(client.photo, "s3") : null,
            phone: PhoneVO.create(client.phone),
        });
    }
}
