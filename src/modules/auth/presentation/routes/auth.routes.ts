import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { LocalAuthServices } from "@Auth/infraestruture/services/local-auth.services";

const localAuthService = new LocalAuthServices();
const localAuthControler = new AuthController(localAuthService);

class AuthRoutes {
    readonly router: Router;

    constructor() {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.post("/local", localAuthControler.authenticateLocal.bind(localAuthControler));
    }
}

export const authRoutes = new AuthRoutes().router;
