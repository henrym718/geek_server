import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { EmailVO, IdVO, PasswordVO, ProviderVO, RoleVO, TextVO, TokenVO, UrlVO } from "@Core/value-objects";
import { IUserRepository } from "@User/application/ports/user.repository";
import { User } from "@Core/entities/user";
import { Prisma, User as UserPrisma } from "@prisma/client";
import { Client } from "@Core/entities/client";
import { Vendor } from "@Core/entities/vendor";
import { PhoneVO } from "@Core/value-objects/phone.vo";

export class UserPrismaRepository implements IUserRepository {
    private get prisma() {
        return PrismaBootstrap.prisma;
    }

    async create(user: User): Promise<void> {
        await this.prisma.user.create({
            data: this.toPrisma(user),
        });
    }

    findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    async findUserByIdWithProfile(id: string): Promise<{ user: User; vendor?: Vendor | null; client?: Client | null } | null> {
        const userFound = await this.prisma.user.findUnique({ where: { id }, include: { client: true, vendor: true } });

        if (!userFound) return null;
        const { client, vendor, ...userData } = userFound;
        return {
            user: this.toDomain(userData),
            vendor: vendor ? this.toVendorDomain(vendor) : null,
            client: client ? this.toClientDomain(client) : null,
        };
    }

    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async update(user: User): Promise<void> {
        await this.prisma.user.update({
            where: { id: user.id.getValue() },
            data: this.toPrisma(user),
        });
    }

    async findbyEmail(email: string): Promise<User | null> {
        const userFound = await this.prisma.user.findUnique({ where: { email } });
        if (!userFound) return null;
        return this.toDomain(userFound);
    }

    private toPrisma(user: User): Prisma.UserCreateInput {
        return {
            id: user.id.getValue(),
            provider: user.provider.getValue(),
            email: user.email.getValue(),
            password: user.password?.getValue() ?? null,
            role: user.role.getValue(),
            refresToken: user.refreshToken.getValue(),
            tokenProvider: user.tokenProvider?.getValue() ?? null,
        };
    }

    private toDomain(user: UserPrisma): User {
        return User.reconstitute({
            id: IdVO.create(user.id),
            provider: ProviderVO.fromPlainText(user.provider),
            email: EmailVO.create(user.email),
            password: user.password ? PasswordVO.fromPlainText(user.password) : null,
            role: RoleVO.fromPlainText(user.role),
            isActive: user.isActive,
            refreshToken: TokenVO.create(user.refresToken),
            tokenProvider: user.tokenProvider ? TokenVO.create(user.tokenProvider) : null,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    }

    private toVendorDomain(vendor: any): Vendor {
        return Vendor.reconstitute({
            id: IdVO.create(vendor.id),
            firstName: TextVO.create("firstName", vendor.firstName),
            lastName: TextVO.create("lastName", vendor.lastName),
            photo: UrlVO.create("photo", vendor.photo),
            phone: PhoneVO.create(vendor.phone),
            city: TextVO.create("city", vendor.city),
            userId: IdVO.create(vendor.userId),
        });
    }

    private toClientDomain(client: any): Client {
        return Client.reconstitute({
            id: IdVO.create(client.id),
            firstName: TextVO.create("firstName", client.firstName),
            lastName: TextVO.create("photo", client.lastName),
            photo: TextVO.create("photo", client.photo) ?? null,
            city: TextVO.create("city", client.city),
            userId: IdVO.create(client.userId),
        });
    }
}
