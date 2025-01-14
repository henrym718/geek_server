import { User } from "@Domain/entities/user";
import { UserRepository } from "@User/application/ports/user.repository";

export class UserPrismaRepository implements UserRepository {
    create(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    save(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findbyEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
}
