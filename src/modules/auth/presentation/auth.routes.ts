import { authenticate } from "@Common/middlewares/authenticate";
import { AuthController } from "./auth.controller";
import { Router } from "express";
import { ContainerBootstrap, IDENTIFIERS } from "@Bootstraps/container.bootstrap";

export function configureAuthRoutes(): Router {
    const router = Router();

    const authController = ContainerBootstrap.getModuleContainer(IDENTIFIERS.Auth).get(AuthController);

    router.post("/local/register", authController.registerUserLocal);
    router.post("/local/login", authController.loginUserLocal);
    router.get("/me", authenticate, authController.getCurrentAccount);
    router.post("/check-email", authController.checkEmailExists);

    return router;
}
