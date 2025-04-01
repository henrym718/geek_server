export interface IRepository<T> {
    create(data: T, ctx?: any): Promise<void>;
    update(entity: T): Promise<void>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
}
