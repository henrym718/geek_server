import { HttpResponse } from "@Common/response/http.response";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { AUTH_SYMBOL } from "../infraestructure/container/auth.symbol";
import { ReqRegisterLocalDto } from "@Auth/application/use-cases/register-local/register-local.dto";
import { IRegisterLocalUseCase } from "@Auth/application/use-cases/register-local/register-local.use-case";
import { ILoginLocalUseCase } from "@Auth/application/use-cases/login-local/login-local.use-case";
import { ReqLoginLocalDto } from "@Auth/application/use-cases/login-local/login-local.dto";

@injectable()
export class AuthController {
    constructor(
        @inject(AUTH_SYMBOL.RegisterUserUseCase) private readonly registerUserCase: IRegisterLocalUseCase,
        @inject(AUTH_SYMBOL.LoginUserUseCase) private readonly loginUserCase: ILoginLocalUseCase
    ) {
        this.registerUserLocal = this.registerUserLocal.bind(this);
        this.loginUserLocal = this.loginUserLocal.bind(this);
    }
    async registerUserLocal(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqRegisterLocalDto = req.body;
            const { accessToken } = await this.registerUserCase.execute(data);
            HttpResponse.success(res, { accessToken });
        } catch (error) {
            next(error);
        }
    }

    async loginUserLocal(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqLoginLocalDto = req.body;
            const { accessToken } = await this.loginUserCase.execute(data);
            HttpResponse.success(res, { accessToken });
        } catch (error) {
            next(error);
        }
    }
}
