import { PrismaClient } from "@prisma/client";
import { logger } from "@Common/logger";

export class PrismaBootstrap {
    private static prismaClient: PrismaClient | null;

    async inizialized(): Promise<void> {
        try {
            PrismaBootstrap.prismaClient = new PrismaClient();
            await PrismaBootstrap.prismaClient.$connect();
            logger.info("✅ Prisma is connected");
        } catch (error) {
            PrismaBootstrap.prismaClient = null;
            throw error;
        }
    }

    public static get prisma(): PrismaClient {
        if (!PrismaBootstrap.prismaClient) {
            throw new Error("La base de datos no está inicializada. Llama a initialize() primero.");
        }
        return PrismaBootstrap.prismaClient;
    }

    public async close(): Promise<void> {
        if (PrismaBootstrap.prismaClient) {
            await PrismaBootstrap.prismaClient.$disconnect();
            logger.error("❌ Prisma is closed");
        }
    }
}
