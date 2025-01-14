import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { User } from "@Domain/entities/user";
import { EmailVO, IdVO, PasswordVO, ProviderVO, RoleVO, TokenVO } from "@Domain/value-objects";
import { UserRepository } from "@User/application/ports/user.repository";

export class UserPrismaRepository implements UserRepository {
    async create(user: User): Promise<void> {
        const prisma = PrismaBootstrap.prisma;
        await prisma.user.create({
            data: {
                id: user.id.getValue(),
                provider: user.provider.getValue(),
                email: user.email.getValue(),
                password: user.password?.getValue() ?? null,
                role: user.role.getValue(),
                isActive: user.isActive,
                createAt: user.createdAt,
                updateAt: user.updatedAt ?? "",
                refresToken: user.refreshToken.getValue(),
                tokenProvider: user.tokenProvider?.getValue(),
            },
        });
    }
    save(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findbyEmail(email: string): Promise<User | null> {
        const prisma = PrismaBootstrap.prisma;

        const userFound = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!userFound) {
            return null;
        }

        return User.reconstitute({
            id: IdVO.create(userFound.id),
            provider: ProviderVO.fromPlainText(userFound.provider),
            email: EmailVO.create(userFound.email),
            password: PasswordVO.fromPlainText(userFound.password ?? ""),
            role: RoleVO.fromPlainText(userFound.role),
            isActive: userFound.isActive,
            refreshToken: TokenVO.create(userFound.refresToken),
            tokenProvider: TokenVO.create(userFound.refresToken),
            createdAt: userFound.createAt,
            updatedAt: userFound.updateAt,
        });
    }
}
