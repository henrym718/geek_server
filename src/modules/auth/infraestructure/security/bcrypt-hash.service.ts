import bcrypt from "bcrypt";
import { HashService } from "@Auth/application/ports/hash.service";
import { PasswordVO } from "@Domain/value-objects";

export class BcryptHashService implements HashService {
    async hash(password: PasswordVO): Promise<string> {
        return await bcrypt.hash(password.getValue(), 10);
    }

    async check(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
