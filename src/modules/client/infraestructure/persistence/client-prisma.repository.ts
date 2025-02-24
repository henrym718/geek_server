import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { Client } from "@Core/entities/client";
import { User } from "@Core/entities/user";

import { IClientRepository } from "modules/client/application/repositories/client.repository";
import { ClientMapper } from "./client.mapper";
import { UserMapper } from "@User/infrastructure/persistence/user.mapper";

export class ClientPrismaRepository implements IClientRepository {
    private get prisma() {
        return PrismaBootstrap.prisma;
    }

    async create(data: Client): Promise<void> {
        await this.prisma.client.create({ data: ClientMapper.toPersistence(data) });
    }

    update(entity: Client): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Client | null> {
        const cliebtFound = await this.prisma.client.findUnique({ where: { id } });
        return cliebtFound ? ClientMapper.toDomain(cliebtFound) : null;
    }

    async findClientByidWithUser(id: string): Promise<{ user: User; client: Client } | null> {
        const response = await this.prisma.client.findUnique({ where: { id }, include: { user: true } });
        if (!response) return null;
        const { user, ...client } = response;
        return { user: UserMapper.toDomain(user), client: ClientMapper.toDomain(client) };
    }

    findAll(): Promise<Client[]> {
        throw new Error("Method not implemented.");
    }
}
