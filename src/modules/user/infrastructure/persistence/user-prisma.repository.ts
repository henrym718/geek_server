import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { IdVO, TextVO, UrlVO } from "@Core/value-objects";
import { IUserRepository } from "@User/application/ports/user.repository";
import { User } from "@Core/entities/user";
import { Client } from "@Core/entities/client";
import { Vendor } from "@Core/entities/vendor";
import { VendorMapper } from "@Vendor/infraestructure/persistence/vendor.mapper";
import { UserMapper } from "./user.mapper";

export class UserPrismaRepository implements IUserRepository {
    private get prisma() {
        return PrismaBootstrap.prisma;
    }

    async create(user: User): Promise<void> {
        await this.prisma.user.create({ data: UserMapper.toPrisma(user) });
    }

    findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    async findUserByEmailWithProfile(email: string): Promise<{ user: User; vendor?: Vendor | null; client?: Client | null } | null> {
        const userFound = await this.prisma.user.findUnique({ where: { email }, include: { client: true, vendor: true } });

        if (!userFound) return null;
        const { client, vendor, ...userData } = userFound;
        return {
            user: UserMapper.toDomain(userData),
            vendor: vendor ? VendorMapper.toDomain(vendor) : null,
            client: client ? this.toClientDomain(client) : null,
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

    private toClientDomain(client: any): Client {
        return Client.reconstitute({
            id: IdVO.create(client.id),
            firstName: TextVO.create("firstName", client.firstName),
            lastName: TextVO.create("photo", client.lastName),
            photo: UrlVO.create(client.photo, "s3") ?? null,
            city: TextVO.create("city", client.city),
        });
    }
}
