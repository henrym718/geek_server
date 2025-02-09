import "reflect-metadata";
import { Container } from "inversify";
import { AUTH_SYMBOL } from "./auth.symbol";

import { IHashService } from "@Auth/application/interfaces/services/hash.service";
import { ITokenService } from "@Auth/application/interfaces/services/token.service";
import { IUUIDService } from "@Auth/application/interfaces/services/uuid.service";
import { HashServiceImpl } from "@Auth/infraestructure/services/hash.service.impl";
import { TokenServiceImpl } from "@Auth/infraestructure/services/token.service.impl";
import { UUIDServiceImpl } from "@Auth/infraestructure/services/uuid.service.impl";

import { IRegisterUserUseCase } from "@Auth/application/interfaces/use-cases/register-user.use-case";
import { ILoginUserUseCase } from "@Auth/application/interfaces/use-cases/login-user.use-case";
import { RegisterUser } from "@Auth/application/use-cases/register-user";
import { LoginUser } from "@Auth/application/use-cases/login-user";

import { AuthController } from "../../presentation/auth.controller";
import { IUserRepository } from "@User/application/ports/user.repository";
import { UserPrismaRepository } from "@User/infrastructure/persistence/user-prisma.repository";

export const authContainer = new Container();

authContainer.bind<IHashService>(AUTH_SYMBOL.HashService).to(HashServiceImpl);
authContainer.bind<ITokenService>(AUTH_SYMBOL.TokenService).to(TokenServiceImpl);
authContainer.bind<IUUIDService>(AUTH_SYMBOL.IdService).to(UUIDServiceImpl);
authContainer.bind<IRegisterUserUseCase>(AUTH_SYMBOL.RegisterUserUseCase).to(RegisterUser);
authContainer.bind<ILoginUserUseCase>(AUTH_SYMBOL.LoginUserUseCase).to(LoginUser);
authContainer.bind<IUserRepository>(AUTH_SYMBOL.UserRepository).to(UserPrismaRepository).inSingletonScope();
authContainer.bind<AuthController>(AuthController).toSelf();
