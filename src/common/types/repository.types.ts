export interface Respository<T = unknown> {
    create(data: T): Promise<T>;
    update(data: T): Promise<T>;
    find(): Promise<T[]>;
    delete(id: string): Promise<void>;
}
