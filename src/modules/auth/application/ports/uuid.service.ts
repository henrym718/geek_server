export interface UuidService {
    generateUUID(): string;
    isValid(uuid: string): boolean;
}
