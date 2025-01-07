import { NextFunction, Request, Response } from "express";
import { LocalCredentialsDto } from "@Auth/application/dtos/local-credentials.dto";
import { LocalAuthPort } from "@Auth/application/ports/local-auth.port";

export class AuthController {
    constructor(private readonly localAuthservice: LocalAuthPort) {}

    authenticateLocal(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body);
            const data: LocalCredentialsDto = req.body;
            this.localAuthservice.authenticate(data);
            res.json(req.body);
        } catch (error) {
            next(error);
        }
    }
}
