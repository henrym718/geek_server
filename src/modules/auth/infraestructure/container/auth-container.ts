import "reflect-metadata";
import { Container } from "inversify";
import { AUTH_SYMBOL } from "./auth.symbol";

import { IHashService } from "@Auth/application/services/hash.service";
import { HashServiceImpl } from "@Auth/infraestructure/services/hash.service.impl";

import { IRegisterLocalUseCase } from "@Auth/application/use-cases/register-local/register-local.use-case";
import { ILoginLocalUseCase } from "@Auth/application/use-cases/login-local/login-local.use-case";
import { RegisterUserUseCase } from "@Auth/application/use-cases/register-local/register-local-impl";

import { AuthController } from "../../presentation/auth.controller";
import { IUserRepository } from "@User/application/ports/user.repository";
import { UserPrismaRepository } from "@User/infrastructure/persistence/user-prisma.repository";
import { LoginLocalUserCase } from "@Auth/application/use-cases/login-local/login-local-impl";
import { IGetCurrentAccountUseCase } from "@Auth/application/use-cases/get-current-account/get-current-account.use-case";
import { GetCurrentAccountUseCase } from "@Auth/application/use-cases/get-current-account/get-current-account.impl";
import { sharedContainer } from "@Shared/container/shared.container";

export const authContainer = new Container();
authContainer.parent = sharedContainer;

authContainer.bind<IHashService>(AUTH_SYMBOL.HashService).to(HashServiceImpl);
authContainer.bind<IRegisterLocalUseCase>(AUTH_SYMBOL.RegisterUserUseCase).to(RegisterUserUseCase);
authContainer.bind<ILoginLocalUseCase>(AUTH_SYMBOL.LoginUserUseCase).to(LoginLocalUserCase);
authContainer.bind<IGetCurrentAccountUseCase>(AUTH_SYMBOL.GetCurrentAccountUseCase).to(GetCurrentAccountUseCase);
authContainer.bind<IUserRepository>(AUTH_SYMBOL.UserRepository).to(UserPrismaRepository).inSingletonScope();
authContainer.bind<AuthController>(AuthController).toSelf();
