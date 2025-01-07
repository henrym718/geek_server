import { NextFunction, Request, Response } from "express";
import { LocalCredentialsDto } from "../../application/dtos/local-credentials.dto";
import { LocalAuthPort } from "../../application/ports/local-auth.port";

export class AuthController {
    constructor(private readonly localAuthservice: LocalAuthPort) {}

    authenticateLocal(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);
        const data: LocalCredentialsDto = req.body;
        this.localAuthservice.authenticate(data);
        res.json(req.body);
    }
}
