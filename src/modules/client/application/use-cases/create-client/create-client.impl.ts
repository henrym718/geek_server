import { inject, injectable } from "inversify";
import { IClientRepository } from "../../repositories/client.repository";
import { ReqCreateClientDTO, ResCreateClientDTO } from "./create-client.cto";
import { ICreateClientUseCase } from "./create-client.use-case";
import { CLIENT_SYMBOLS } from "@Client/infraestructure/container/client.symbols";
import { IdVO, TextVO, UrlVO } from "@Core/value-objects";
import { Client } from "@Core/entities/client";
import { User } from "@Core/entities/user";
import { HttpException } from "@Common/exceptions/http.exception";

@injectable()
export class CreateClientUseCase implements ICreateClientUseCase {
    constructor(@inject(CLIENT_SYMBOLS.ClientRepository) private readonly clientRepository: IClientRepository) {}

    async execute(data: ReqCreateClientDTO): Promise<ResCreateClientDTO> {
        const existingClient = await this.clientRepository.findById(data.id);
        if (existingClient) throw HttpException.badRequest("Client has been created");

        const newClient = this.createClientEntity(data);
        await this.clientRepository.create(newClient);
        const clientCreated = await this.clientRepository.findClientByidWithUser(newClient.id.getValue());
        if (!clientCreated) throw HttpException.notFound("Client not found");
        return this.mapToResponse(clientCreated);
    }

    private createClientEntity(data: ReqCreateClientDTO): Client {
        const { id, firstName, lastName, city, photo } = data;

        return Client.create({
            id: IdVO.create(id),
            firstName: TextVO.create("firstName", firstName),
            lastName: TextVO.create("lastName", lastName),
            photo: photo ? UrlVO.create(photo, "s3") : null,
            city: TextVO.create("city", city),
        });
    }

    private mapToResponse({ user, client }: { user: User; client: Client }): ResCreateClientDTO {
        return {
            id: user.id.getValue(),
            email: user.email.getValue(),
            role: user.role.getValue(),
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            profileCompleted: !!client,
            clientProfile: {
                firstName: client.firstName.getValue(),
                lastName: client.lastName.getValue(),
                photo: client.photo?.getValue() ?? null,
                city: client.city.getValue(),
            },
        };
    }
}
