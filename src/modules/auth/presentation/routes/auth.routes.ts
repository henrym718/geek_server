import { authContainer } from "../container/container";
import { AuthController } from "../controllers/auth.controller";
import { Router } from "express";

const authController = authContainer.get<AuthController>(AuthController);

const router = Router();

router.post("/local/register", authController.registerUserLocal);
router.post("/local/login", authController.loginUserLocal);

export const authRoutes = router;
