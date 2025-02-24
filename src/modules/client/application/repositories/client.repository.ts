import { Client } from "@Core/entities/client";
import { User } from "@Core/entities/user";
import { IRepository } from "@Shared/repositories/repository";

export interface IClientRepository extends IRepository<Client> {
    findClientByidWithUser(id: string): Promise<{ user: User; client: Client } | null>;
}
