import { Client } from "@Core/entities/client";
import { User } from "@Core/entities/user";
import { Vendor } from "@Core/entities/vendor";
import { IRepository } from "@Shared/repositories/repository";

export interface IUserRepository extends IRepository<User> {
    create(user: User): Promise<void>;
    update(user: User): Promise<void>;
    findbyEmail(email: string): Promise<User | null>;
    findUserByEmailWithProfile(email: string): Promise<{ user: User; vendor?: Vendor | null; client?: Client | null } | null>;
}
