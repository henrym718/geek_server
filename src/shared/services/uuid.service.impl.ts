import { IUUIDService } from "shared/interfaces/uuid.service";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class UUIDServiceImpl implements IUUIDService {
    generateUUID(): string {
        return uuidv4();
    }
    isValid(uuid: string): boolean {
        return uuidValidate(uuid);
    }
}
