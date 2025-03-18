import { authenticate } from "@Common/middlewares/authenticate";
import { authContainer } from "../infraestructure/container/auth-container";
import { AuthController } from "./auth.controller";
import { Router } from "express";

const authController = authContainer.get(AuthController);

const router = Router();

router.post("/local/register", authController.registerUserLocal);
router.post("/local/login", authController.loginUserLocal);
router.get("/me", authenticate, authController.getCurrentAccount);
router.get("/check-email", authController.checkEmailExists);

export const authRoutes = router;
