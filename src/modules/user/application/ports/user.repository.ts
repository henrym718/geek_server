import { User } from "@Domain/entities/user";

export interface UserRepository {
    findbyEmail(email: string): Promise<User | null>;
    create(user: User): Promise<User>;
}
