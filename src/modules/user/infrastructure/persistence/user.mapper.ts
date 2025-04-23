import { User } from "@Core/entities/user";
import { EmailVO, IdVO, PasswordVO, ProviderVO, RoleVO, TokenVO } from "@Core/value-objects";
import { UsernameVO } from "@Core/value-objects/username.vo";
import { Prisma, User as UserPrisma } from "@prisma/client";

export class UserMapper {
    public static toPrisma(user: User): Prisma.UserCreateInput {
        return {
            id: user.id.getValue(),
            provider: user.provider.getValue(),
            email: user.email.getValue(),
            password: user.password?.getValue() ?? null,
            role: user.role.getValue(),
            refresToken: user.refreshToken.getValue(),
            tokenProvider: user.tokenProvider?.getValue() ?? null,
            username: user.username.getValue(),
        };
    }

    public static toDomain(user: UserPrisma): User {
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
            username: UsernameVO.create(user.username),
        });
    }
}
