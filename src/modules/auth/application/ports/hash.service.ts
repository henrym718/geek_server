import { PasswordVO } from "@Domain/value-objects";

export interface HashService {
    hash(password: PasswordVO): Promise<string>;
    check(password: string, hash: string): Promise<boolean>;
}
