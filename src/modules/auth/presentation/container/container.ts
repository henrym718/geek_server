import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "../types/types";

import { HashService } from "@Auth/application/ports/hash.service";
import { TokenService } from "@Auth/application/ports/token.service";
import { IdService } from "@Auth/application/ports/uuid.service";
import { UserRepository } from "@User/application/ports/user.repository";

import { BcryptHashService } from "@Auth/infraestructure/security/bcrypt-hash.service";
import { JwtTokenService } from "@Auth/infraestructure/security/jwt-token.service";
import { UUIDService } from "@Auth/infraestructure/utils/uuid.servioce";
import { UserPrismaRepository } from "@User/infrastructure/persistence/user-prisma.repository";

import { AuthController } from "../controllers/auth.controller";
import { RegisterUserUseCase } from "@Auth/application/use-cases/local/register/register-user.use-case";
import { RegisterUser } from "@Auth/application/use-cases/local/register/register-user";

export const authContainer = new Container();

authContainer.bind<HashService>(TYPES.HashService).to(BcryptHashService);
authContainer.bind<TokenService>(TYPES.TokenService).to(JwtTokenService);
authContainer.bind<IdService>(TYPES.IdService).to(UUIDService);
authContainer.bind<UserRepository>(TYPES.UserRepository).to(UserPrismaRepository);
authContainer.bind<RegisterUserUseCase>(TYPES.RegisterUserUseCase).to(RegisterUser);

authContainer.bind<AuthController>(AuthController).toSelf();
