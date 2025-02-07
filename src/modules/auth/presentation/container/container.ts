import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "../types/types";

import { IHashService } from "@Auth/application/interfaces/services/hash.service";
import { ITokenService } from "@Auth/application/interfaces/services/token.service";
import { IUUIDService } from "@Auth/application/interfaces/services/uuid.service";
import { UserRepository } from "@User/application/ports/user.repository";

import { HashServiceImpl } from "@Auth/infraestructure/hash.service.impl";
import { TokenServiceImpl } from "@Auth/infraestructure/token.service.impl";
import { UUIDServiceImpl } from "@Auth/infraestructure/uuid.service.impl";
import { UserPrismaRepository } from "@User/infrastructure/persistence/user-prisma.repository";

import { AuthController } from "../controllers/auth.controller";
import { IRegisterUserUseCase } from "@Auth/application/interfaces/use-cases/register-user.use-case";
import { RegisterUser } from "@Auth/application/use-cases/register-user";
import { LoginUser } from "@Auth/application/use-cases/login-user";
import { ILoginUserUseCase } from "@Auth/application/interfaces/use-cases/login-user.use-case";

export const authContainer = new Container();

authContainer.bind<IHashService>(TYPES.HashService).to(HashServiceImpl);
authContainer.bind<ITokenService>(TYPES.TokenService).to(TokenServiceImpl);
authContainer.bind<IUUIDService>(TYPES.IdService).to(UUIDServiceImpl);
authContainer.bind<UserRepository>(TYPES.UserRepository).to(UserPrismaRepository);
authContainer.bind<IRegisterUserUseCase>(TYPES.RegisterUserUseCase).to(RegisterUser);
authContainer.bind<ILoginUserUseCase>(TYPES.LoginUserUseCase).to(LoginUser);

authContainer.bind<AuthController>(AuthController).toSelf();
