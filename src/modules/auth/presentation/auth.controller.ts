import { HttpResponse } from "@Common/response/http.response";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { AUTH_SYMBOL } from "../infraestructure/container/auth.symbol";
import { ReqRegisterLocalDto } from "@Auth/application/use-cases/register-local/register-local.dto";
import { IRegisterLocalUseCase } from "@Auth/application/use-cases/register-local/register-local.use-case";
import { ILoginLocalUseCase } from "@Auth/application/use-cases/login-local/login-local.use-case";
import { ReqLoginLocalDto } from "@Auth/application/use-cases/login-local/login-local.dto";
import { IGetCurrentAccountUseCase } from "@Auth/application/use-cases/get-current-account/get-current-account.use-case";
import { ReqGetCurrentAccountDTO } from "@Auth/application/use-cases/get-current-account/get-current-account.dto";
import { HttpException } from "@Common/exceptions/http.exception";

@injectable()
export class AuthController {
    constructor(
        @inject(AUTH_SYMBOL.RegisterUserUseCase) private readonly registerUserCase: IRegisterLocalUseCase,
        @inject(AUTH_SYMBOL.LoginUserUseCase) private readonly loginUserCase: ILoginLocalUseCase,
        @inject(AUTH_SYMBOL.GetCurrentAccountUseCase) private readonly getCurrentAccountUseCase: IGetCurrentAccountUseCase
    ) {
        this.registerUserLocal = this.registerUserLocal.bind(this);
        this.loginUserLocal = this.loginUserLocal.bind(this);
        this.getCurrentAccount = this.getCurrentAccount.bind(this);
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
            const response = await this.loginUserCase.execute(data);
            HttpResponse.success(res, response);
        } catch (error) {
            next(error);
        }
    }

    async getCurrentAccount(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.user?.userId) throw HttpException.badRequest("Invalid user data or userId");
            const userId: ReqGetCurrentAccountDTO = { email: req.user.email };
            const response = await this.getCurrentAccountUseCase.execute(userId);
            HttpResponse.success(res, response);
        } catch (error) {
            next(error);
        }
    }
}
