import { AppBootstrap } from "@Bootstraps/app.bootstrap";

(async () => {
  const app = new AppBootstrap();
  await app.initialize();
})();
