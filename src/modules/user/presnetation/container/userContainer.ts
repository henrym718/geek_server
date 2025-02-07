import "reflect-metadata";
import { Container } from "inversify";

import { UserRepository } from "@User/application/ports/user.repository";
import { UserPrismaRepository } from "@User/infrastructure/persistence/user-prisma.repository";
import { USER_TYPES } from "../types/types";

export const userContainer = new Container();

userContainer.bind<UserRepository>(USER_TYPES.UserRepository).to(UserPrismaRepository);
