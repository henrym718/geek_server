import { IUserRepository } from "@User/domain/ports/user.repository";
import { PrismaBootstrap } from "bootstraps/prisma.bootsrap";
import { User } from "@User/domain/entities/user";
import { toRole } from "@Common/toRole";
import { toProvider } from "@Common/toAuthProvider";

export class UserRepository implements IUserRepository {
    async findbyEmail(email: string): Promise<User | null> {
        const prisma = PrismaBootstrap.prisma;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return null;

        return User.reconstitute({
            id: user.id,
            email: user.email,
            password: user.password,
            provider: toProvider(user.provider),
            role: toRole(user.role),
            isActive: user.isActive,
            createdAt: user.createAt,
            updatedAt: user.updateAt,
        });
    }
}
