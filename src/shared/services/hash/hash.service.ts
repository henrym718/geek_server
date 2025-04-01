export interface IHashService {
    hash(password: string): Promise<string>;
    check(password: string, hash: string): Promise<boolean>;
}
