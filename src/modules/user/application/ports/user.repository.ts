import { User } from "@Core/entities/user";

export interface IUserRepository {
    create(user: User): Promise<void>;
    update(user: User): Promise<void>;
    findbyEmail(email: string): Promise<User | null>;
}
