export interface IUUIDService {
    generateUUID(): string;
    isValid(uuid: string): boolean;
}
