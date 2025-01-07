import { User } from "../entities/user";

export interface IUserRepository {
    findbyEmail(email: string): Promise<User | null>;
}
