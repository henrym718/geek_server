import { IdService } from "@Auth/application/ports/uuid.service";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

export class UUIDService implements IdService {
    generateUUID(): string {
        return uuidv4();
    }
    isValid(uuid: string): boolean {
        return uuidValidate(uuid);
    }
}
