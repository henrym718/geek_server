import { User } from "@Domain/entities/user";

export interface UserRepository {
    findbyEmail(email: string): Promise<User | null>;
    save(user: User): Promise<void>;
}
