import { HttpResponse } from "@Common/http.response";
import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { TYPES } from "../types/types";
import { RegisterUserDto } from "@Auth/application/dtos/register-user.dto";
import { IRegisterUserUseCase } from "@Auth/application/interfaces/use-cases/register-user.use-case";
import { ILoginUserUseCase } from "@Auth/application/interfaces/use-cases/login-user.use-case";
import { LoginUserDto } from "@Auth/application/dtos/login-user.dto";

export class AuthController {
    constructor(
        @inject(TYPES.RegisterUserUseCase) private readonly registerUserCase: IRegisterUserUseCase,
        @inject(TYPES.LoginUserUseCase) private readonly loginUserCase: ILoginUserUseCase
    ) {
        this.registerUserLocal = this.registerUserLocal.bind(this);
        this.loginUserLocal = this.loginUserLocal.bind(this);
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

    async loginUserLocal(req: Request, res: Response, next: NextFunction) {
        try {
            const data: LoginUserDto = req.body;
            const { accessToken } = await this.loginUserCase.execute(data);
            HttpResponse.success(res, { accessToken });
        } catch (error) {
            next(error);
        }
    }
}
