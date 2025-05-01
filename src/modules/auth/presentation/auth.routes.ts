import { authenticate } from "@Common/middlewares/authenticate";
import { AuthController } from "./auth.controller";
import { Router } from "express";
import { ContainerBootstrap, IDENTIFIERS } from "@Bootstraps/container.bootstrap";

export function configureAuthRoutes(): Router {
    const router = Router();

    const authController = ContainerBootstrap.getModuleContainer(IDENTIFIERS.Auth).get(AuthController);

    router.post("/register", authController.registerUserLocal);
    router.post("/login", authController.loginUserLocal);
    router.get("/me", authenticate, authController.getCurrentAccount);
    router.post("/check-email", authController.checkEmailExists);
    router.post("/check-username", authController.checkUsernameExists);
    router.get("/logout", authenticate, authController.logout);

    return router;
}
