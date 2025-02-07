import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { HttpException } from "@Common/http.exception";
import { User } from "@Domain/entities/user";
import { EmailVO, IdVO, PasswordVO, ProviderVO, RoleVO, TokenVO } from "@Domain/value-objects";
import { UserRepository } from "@User/application/ports/user.repository";

export class UserPrismaRepository implements UserRepository {
    private get prisma() {
        const prisma = PrismaBootstrap.prisma;
        if (!prisma) {
            HttpException.forbidden("Prisma client not initialized");
        }
        return prisma;
    }

    async create(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: user.id.getValue(),
                provider: user.provider.getValue(),
                email: user.email.getValue(),
                password: user.password?.getValue() ?? null,
                role: user.role.getValue(),
                isActive: user.isActive,
                createAt: user.createdAt,
                refresToken: user.refreshToken.getValue(),
                tokenProvider: user.tokenProvider?.getValue(),
            },
        });
    }
    async save(user: User): Promise<void> {
        await this.prisma.user.update({
            where: { id: user.id.getValue() },
            data: {
                provider: user.provider.getValue(),
                email: user.email.getValue(),
                password: user.password?.getValue() ?? null,
                role: user.role.getValue(),
                isActive: user.isActive,
                createAt: user.createdAt,
                refresToken: user.refreshToken.getValue(),
                tokenProvider: user.tokenProvider?.getValue(),
            },
        });
    }
    async findbyEmail(email: string): Promise<User | null> {
        const userFound = await this.prisma.user.findUnique({ where: { email } });

        if (!userFound) return null;

        return User.reconstitute({
            id: IdVO.create(userFound.id),
            provider: ProviderVO.fromPlainText(userFound.provider),
            email: EmailVO.create(userFound.email),
            password: PasswordVO.fromPlainText(userFound.password ?? ""),
            role: RoleVO.fromPlainText(userFound.role),
            isActive: userFound.isActive,
            refreshToken: TokenVO.create(userFound.refresToken),
            tokenProvider: userFound.tokenProvider ? TokenVO.create(userFound.tokenProvider) : null,
            createdAt: userFound.createAt,
            updatedAt: userFound.updateAt,
        });
    }
}
