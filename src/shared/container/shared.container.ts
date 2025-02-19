import { Container } from "inversify";
import { SHARED_SYMBOLS } from "./shared.symbols";
import { ITokenService } from "@Shared/services/token/token.service";
import { TokenServiceImpl } from "@Shared/services/token/token.service.impl";
import { UUIDServiceImpl } from "@Shared/services/uuid/uuid.service.impl";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import "reflect-metadata";

export const sharedContainer = new Container();

sharedContainer.bind<ITokenService>(SHARED_SYMBOLS.TokenService).to(TokenServiceImpl);
sharedContainer.bind<IUUIDService>(SHARED_SYMBOLS.UUIDService).to(UUIDServiceImpl);
