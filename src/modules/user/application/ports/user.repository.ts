import { User } from "@Core/domain/entities/user";

export interface IUserRepository {
    create(user: User): Promise<void>;
    update(user: User): Promise<void>;
    findbyEmail(email: string): Promise<User | null>;
}
