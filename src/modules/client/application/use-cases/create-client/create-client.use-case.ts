import { CreateClientRequest, CreateClientResponse } from "./create-client.cto";

export interface ICreateClientUseCase {
    execute(data: CreateClientRequest): Promise<CreateClientResponse>;
}
