import { AppBootstrap } from "@Bootstraps/app.bootstrap";
import { EnvBootstrap } from "@Bootstraps/env.bootstrap";
import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { ServerBootstrap } from "@Bootstraps/server.bootsrap";

const app = new AppBootstrap(new EnvBootstrap(), new PrismaBootstrap(), new ServerBootstrap());

(async () => {
    await app.initialize();
})();
