import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { EmailVO, IdVO, PasswordVO, ProviderVO, RoleVO, TokenVO } from "@Core/value-objects";
import { IUserRepository } from "@User/application/ports/user.repository";
import { User } from "@Core/entities/user";
import { Prisma, User as UserPrisma } from "@prisma/client";
import { Client } from "@Core/entities/client";
import { Vendor } from "@Core/entities/vendor";

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

    findUserByIdWithProfile(id: string): Promise<{ user: User; vendor?: Vendor; client?: Client } | null> {
        throw new Error("Method not implemented.");
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
}
