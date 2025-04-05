import { HttpResponse } from "@Common/response/http.response";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { AUTH_SYMBOL } from "../infraestructure/container/auth.symbol";
import { RegisterLocalRequest } from "@Auth/application/use-cases/register-local/register-local.dto";
import { IRegisterLocalUseCase } from "@Auth/application/use-cases/register-local/register-local.use-case";
import { ILoginLocalUseCase } from "@Auth/application/use-cases/login-local/login-local.use-case";
import { ReqLoginLocalDto } from "@Auth/application/use-cases/login-local/login-local.dto";
import { IGetCurrentAccountUseCase } from "@Auth/application/use-cases/get-current-account/get-current-account.use-case";
import { ReqGetCurrentAccountDTO } from "@Auth/application/use-cases/get-current-account/get-current-account.dto";
import { CheckEmailRequest } from "@Auth/application/use-cases/check-email-exists/check-email-exists.dto";
import { ICheckEmailExistsUseCase } from "@Auth/application/use-cases/check-email-exists/check-email-exists.use-case";
import { CheckUsernameExistsRequest } from "@Auth/application/use-cases/check-username-exists/check-username-exists.dto";
import { ICheckUsernameExistsUseCase } from "@Auth/application/use-cases/check-username-exists/check-username-exists.use-case";
import { EnvBootstrap } from "@Bootstraps/env.bootstrap";

@injectable()
export class AuthController {
    constructor(
        @inject(AUTH_SYMBOL.RegisterUser) private readonly registerUserCase: IRegisterLocalUseCase,
        @inject(AUTH_SYMBOL.LoginUser) private readonly loginUserCase: ILoginLocalUseCase,
        @inject(AUTH_SYMBOL.GetCurrentAccount) private readonly getCurrentAccountUseCase: IGetCurrentAccountUseCase,
        @inject(AUTH_SYMBOL.CheckEmailExists) private readonly checkEmailExistsUseCase: ICheckEmailExistsUseCase,
        @inject(AUTH_SYMBOL.CheckUsernameExists) private readonly checkUsernameExistsUseCase: ICheckUsernameExistsUseCase
    ) {
        this.registerUserLocal = this.registerUserLocal.bind(this);
        this.loginUserLocal = this.loginUserLocal.bind(this);
        this.getCurrentAccount = this.getCurrentAccount.bind(this);
        this.checkEmailExists = this.checkEmailExists.bind(this);
        this.checkUsernameExists = this.checkUsernameExists.bind(this);
    }

    async registerUserLocal(req: Request, res: Response, next: NextFunction) {
        try {
            const data: RegisterLocalRequest = req.body;
            const response = await this.registerUserCase.execute(data);

            if (req.headers["user-agent"]?.includes("Mozilla")) {
                res.cookie("accessToken", response.accessToken, EnvBootstrap.ENV.COOKIE_OPTIONS);
                HttpResponse.success(res, "Cookie set successfully");
                return;
            }

            HttpResponse.success(res, response);
        } catch (error) {
            next(error);
        }
    }

    async loginUserLocal(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqLoginLocalDto = req.body;
            const response = await this.loginUserCase.execute(data);

            if (req.headers["user-agent"]?.includes("Mozilla")) {
                res.cookie("accessToken", response.accessToken, EnvBootstrap.ENV.COOKIE_OPTIONS);
                HttpResponse.success(res, "Cookie set successfully");
                return;
            }

            HttpResponse.success(res, response);
        } catch (error) {
            next(error);
        }
    }

    async getCurrentAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const email: ReqGetCurrentAccountDTO = { email: req.user?.email! };
            const response = await this.getCurrentAccountUseCase.execute(email);
            HttpResponse.success(res, response);
        } catch (error) {
            next(error);
        }
    }

    async checkEmailExists(req: Request, res: Response, next: NextFunction) {
        try {
            const data: CheckEmailRequest = req.body;
            const response = await this.checkEmailExistsUseCase.execute(data);
            HttpResponse.success(res, response);
        } catch (error) {
            next(error);
        }
    }

    async checkUsernameExists(req: Request, res: Response, next: NextFunction) {
        try {
            const data: CheckUsernameExistsRequest = req.body;
            const response = await this.checkUsernameExistsUseCase.execute(data);
            HttpResponse.success(res, response);
        } catch (error) {
            next(error);
        }
    }
}
