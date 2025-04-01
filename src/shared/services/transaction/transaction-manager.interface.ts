export interface ITransactionManager {
    runInTransaction<T>(callback: (ctx: any) => Promise<T>): Promise<T>;
}
