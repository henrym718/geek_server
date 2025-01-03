import { ServerBootstrap } from "./bootsraps/server.bootsrap";
import { EnvBootstrap } from "./bootsraps/env.bootstrap";
import { logger } from "./common/logger";
import { PrismaBootstrap } from "./bootsraps/prisma.bootsrap";

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
