export interface IdService {
    generateUUID(): string;
    isValid(uuid: string): boolean;
}
