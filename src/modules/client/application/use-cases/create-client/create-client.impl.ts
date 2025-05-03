import { inject, injectable } from "inversify";
import { IClientRepository } from "../../repositories/client.repository";
import { CreateClientRequest, CreateClientResponse } from "./create-client.cto";
import { ICreateClientUseCase } from "./create-client.use-case";
import { CLIENT_SYMBOLS } from "@Client/infraestructure/container/client.symbols";
import { IdVO, TextVO, UrlVO } from "@Core/value-objects";
import { Client } from "@Core/entities/client";
import { HttpException } from "@Common/exceptions/http.exception";
import { PhoneVO } from "@Core/value-objects/phone.vo";

@injectable()
export class CreateClientUseCase implements ICreateClientUseCase {
    constructor(@inject(CLIENT_SYMBOLS.ClientRepository) private readonly clientRepository: IClientRepository) {}

    async execute(data: CreateClientRequest): Promise<CreateClientResponse> {
        const existingClient = await this.clientRepository.findById(data.id);
        if (existingClient) throw HttpException.badRequest("Client has been created");

        const newClient = Client.create({
            id: IdVO.create(data.id),
            firstName: TextVO.create("firstName", data.firstName),
            lastName: TextVO.create("lastName", data.lastName),
            city: IdVO.create(data.city),
            phone: PhoneVO.create(data.phone),
            photo: data.photo ? UrlVO.create(data.photo, "s3") : null,
        });
        return { client: newClient };
    }
}
