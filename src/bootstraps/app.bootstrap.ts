import { logger } from "@Common/logs/logger";
import { EnvBootstrap } from "./env.bootstrap";
import { PrismaBootstrap } from "./prisma.bootsrap";
import { ServerBootstrap } from "./server.bootsrap";
import "../types/express";

export class AppBootstrap {
    constructor(
        private readonly envBootstrap: EnvBootstrap,
        private readonly prismaBootstrap: PrismaBootstrap,
        private readonly serverBootstrap: ServerBootstrap
    ) {}

    async initialize() {
        try {
            await this.envBootstrap.initialize();
            await this.prismaBootstrap.inizialized();
            await this.serverBootstrap.initialize();
        } catch (error) {
            logger.error(error);
            await this.cleanup();
            process.exit(1);
        }
    }
    private async cleanup() {
        await this.prismaBootstrap.close();
        await this.serverBootstrap.close();
    }
}
