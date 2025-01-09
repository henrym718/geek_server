export interface HashService {
    hash(password: string): Promise<string>;
    coompare(password: string, hash: string): Promise<boolean>;
}
