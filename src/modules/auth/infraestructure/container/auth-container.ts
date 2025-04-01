import "reflect-metadata";
import { Container } from "inversify";
import { AUTH_SYMBOL } from "./auth.symbol";
import { RegisterUserUseCase } from "@Auth/application/use-cases/register-local/register-local-impl";
import { AuthController } from "../../presentation/auth.controller";
import { LoginLocalUserCase } from "@Auth/application/use-cases/login-local/login-local-impl";
import { GetCurrentAccountUseCase } from "@Auth/application/use-cases/get-current-account/get-current-account.impl";
import { CheckEmailExistsUseCase } from "@Auth/application/use-cases/check-email-exist/check-email-exists.impl";
import { USER_SYMBOLS } from "@User/infrastructure/container/user.symbol";
import { CreateUserUseCase } from "@User/application/use-cases/create-user/create-user.imple";
import { CLIENT_SYMBOLS } from "@Client/infraestructure/container/client.symbols";
import { CreateClientUseCase } from "@Client/application/use-cases/create-client/create-client.impl";
import { VENDOR_SYMBOLS } from "@Vendor/infraestructure/container/vendor.symbol";
import { CreateVendorUseCase } from "@Vendor/application/use-cases/create-vendor/create-vendor.impl";
import { registerControllers, registerUseCases } from "@Common/utils/container-utils";

export function createAuthContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    registerUseCases(container, [
        { symbol: AUTH_SYMBOL.LoginUser, implementation: LoginLocalUserCase },
        { symbol: AUTH_SYMBOL.CheckEmailExists, implementation: CheckEmailExistsUseCase },
        { symbol: AUTH_SYMBOL.GetCurrentAccount, implementation: GetCurrentAccountUseCase },
        { symbol: AUTH_SYMBOL.RegisterUser, implementation: RegisterUserUseCase },
        { symbol: VENDOR_SYMBOLS.CreateVendor, implementation: CreateVendorUseCase },
        { symbol: CLIENT_SYMBOLS.CreateClient, implementation: CreateClientUseCase },
        { symbol: USER_SYMBOLS.CreateUser, implementation: CreateUserUseCase },
    ]);

    registerControllers(container, [AuthController]);

    return container;
}
