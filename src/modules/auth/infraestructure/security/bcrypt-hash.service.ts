import bcrypt from "bcrypt";
import { HashService } from "@Auth/application/ports/hash.service";

export class BcryptHashService implements HashService {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async check(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
