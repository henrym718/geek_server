import { logger } from "@Common/logs/logger";
import { EnvBootstrap } from "./env.bootstrap";
import { PrismaBootstrap } from "./prisma.bootsrap";
import { ServerBootstrap } from "./server.bootsrap";
import "../types/express";
import { ContainerBootstrap } from "./container.bootstrap";

export class AppBootstrap {
    private readonly envBootstrap: EnvBootstrap;
    private readonly containerBootstrap: ContainerBootstrap;
    private readonly prismaBootstrap: PrismaBootstrap;
    private readonly serverBootstrap: ServerBootstrap;

    constructor() {
        this.envBootstrap = new EnvBootstrap();
        this.containerBootstrap = new ContainerBootstrap();
        this.prismaBootstrap = new PrismaBootstrap();
        this.serverBootstrap = new ServerBootstrap();
    }

    async initialize() {
        try {
            await this.envBootstrap.initialize();
            await this.containerBootstrap.initialize();
            await this.prismaBootstrap.inizialize();
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
