import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { IUserRepository } from "@User/application/repositories/user.repository";
import { User } from "@Core/entities/user";
import { Client } from "@Core/entities/client";
import { Vendor } from "@Core/entities/vendor";
import { VendorMapper } from "@Vendor/infraestructure/persistence/vendor.mapper";
import { UserMapper } from "./user.mapper";
import { ClientMapper } from "@Client/infraestructure/persistence/client.mapper";

export class UserPrismaRepository implements IUserRepository {
    private get prisma() {
        return PrismaBootstrap.prisma;
    }
    async create(user: User, ctx?: any): Promise<void> {
        const client = ctx || this.prisma;
        await client.user.create({ data: UserMapper.toPrisma(user) });
    }

    async findById(id: string): Promise<User | null> {
        const userFound = await this.prisma.user.findUnique({ where: { id } });
        if (!userFound) return null;
        return UserMapper.toDomain(userFound);
    }

    async findByUsername(username: string): Promise<User | null> {
        const userFound = await this.prisma.user.findUnique({ where: { username } });
        if (!userFound) return null;
        return UserMapper.toDomain(userFound);
    }

    async findUserByEmailWithProfile(email: string): Promise<{ user: User; vendor?: Vendor | null; client?: Client | null } | null> {
        const userFound = await this.prisma.user.findUnique({ where: { email }, include: { client: true, vendor: true } });

        if (!userFound) return null;
        const { client, vendor, ...userData } = userFound;
        return {
            user: UserMapper.toDomain(userData),
            vendor: vendor ? VendorMapper.toDomain(vendor) : null,
            client: client ? ClientMapper.toDomain(client) : null,
        };
    }

    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async update(user: User): Promise<void> {
        await this.prisma.user.update({
            where: { id: user.id.getValue() },
            data: UserMapper.toPrisma(user),
        });
    }

    async findbyEmail(email: string): Promise<User | null> {
        const userFound = await this.prisma.user.findUnique({ where: { email } });
        if (!userFound) return null;
        return UserMapper.toDomain(userFound);
    }
}
