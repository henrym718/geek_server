import { RegisterUserDto } from "@Auth/application/use-cases/local/register/register-user.dto";
import { RegisterUserUseCase } from "@Auth/application/use-cases/local/register/register-user.use-case";
import { HttpResponse } from "@Common/http.response";
import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../types/types";

export class AuthController {
    constructor(@inject(TYPES.RegisterUserUseCase) private readonly registerUserCase: RegisterUserUseCase) {
        this.registerUserLocal = this.registerUserLocal.bind(this);
    }
    async registerUserLocal(req: Request, res: Response, next: NextFunction) {
        try {
            const data: RegisterUserDto = req.body;

            const { accessToken } = await this.registerUserCase.execute(data);
            HttpResponse.success(res, { accessToken });
        } catch (error) {
            next(error);
        }
    }
}
