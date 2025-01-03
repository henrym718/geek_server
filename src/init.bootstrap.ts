import { ServerBootstrap } from "./bootsraps/server.bootsrap";

const serverBootstrap = new ServerBootstrap();

(async () => {
    try {
        await serverBootstrap.initialize();
    } catch (error) {
        await serverBootstrap.close();
        console.log(error);
    }
})();
