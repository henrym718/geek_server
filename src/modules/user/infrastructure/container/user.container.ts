import { Container } from "inversify";
import { USER_SYMBOL } from "./user.symbol";

import { IUserRepository } from "@User/application/ports/user.repository";
import { UserPrismaRepository } from "../persistence/user-prisma.repository";

export const userContainer = new Container();
userContainer.bind<IUserRepository>(USER_SYMBOL.UserRepository).to(UserPrismaRepository).inSingletonScope();
