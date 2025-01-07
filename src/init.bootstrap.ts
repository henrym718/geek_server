import { ServerBootstrap } from "@Bootstraps/server.bootsrap";
import { EnvBootstrap } from "@Bootstraps/env.bootstrap";
import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { logger } from "@Common/logger";

const serverBootstrap = new ServerBootstrap();
const envBootstrap = new EnvBootstrap();
const prismaBootstrap = new PrismaBootstrap();

(async () => {
    try {
        await envBootstrap.initialize();
        await prismaBootstrap.inizialized();
        await serverBootstrap.initialize();
    } catch (error) {
        logger.error(error);
        await prismaBootstrap.close();
        await serverBootstrap.close();
        process.exit(1);
    }
})();
