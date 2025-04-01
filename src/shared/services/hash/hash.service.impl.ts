import bcrypt from "bcrypt";
import { IHashService } from "@Shared/services/hash/hash.service";

export class HashServiceImpl implements IHashService {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async check(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
