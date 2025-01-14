import { User } from "@Domain/entities/user";

export interface UserRepository {
    create(user: User): Promise<void>;
    save(user: User): Promise<void>;
    findbyEmail(email: string): Promise<User | null>;
}
