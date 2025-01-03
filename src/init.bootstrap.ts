import { ServerBootstrap } from "./bootsraps/server.bootsrap";
import { EnvBootstrap } from "./bootsraps/env.bootstrap";
import { logger } from "./common/logger";

const serverBootstrap = new ServerBootstrap();
const envBootstrap = new EnvBootstrap();

(async () => {
    try {
        await envBootstrap.initialize();
        await serverBootstrap.initialize();
    } catch (error) {
        await serverBootstrap.close();
        logger.error(error);
    }
})();
