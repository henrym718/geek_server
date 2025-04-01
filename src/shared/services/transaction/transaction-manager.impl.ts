import { injectable } from "inversify";
import { ITransactionManager } from "./transaction-manager.interface";

import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { Prisma } from "@prisma/client";

@injectable()
export class PrismaTransactionManager implements ITransactionManager {
    private get prisma() {
        return PrismaBootstrap.prisma;
    }
    async runInTransaction<T>(callback: (ctx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
        return this.prisma.$transaction(callback);
    }
}
