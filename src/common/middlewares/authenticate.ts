import { HttpException } from "@Common/exceptions/http.exception";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { ITokenService } from "@Shared/services/token/token.service";
import { NextFunction, Request, Response } from "express";
import { ContainerBootstrap, IDENTIFIERS } from "@Bootstraps/container.bootstrap";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    let accessToken: string | undefined;

    if (req.cookies["accessToken"]) {
        accessToken = req.cookies["accessToken"];
    }

    if (!accessToken && req.header("Authorization")) {
        const header = req.header("Authorization");
        if (!header?.startsWith("Bearer ")) throw HttpException.forbidden("Invalid token format");
        accessToken = header?.split(" ")[1];
    }
    if (!accessToken) {
        throw HttpException.forbidden("Token not provided");
    }

    const sharedContainer = ContainerBootstrap.getModuleContainer(IDENTIFIERS.Auth);
    const tokenService = sharedContainer.get<ITokenService>(SHARED_SYMBOLS.TokenService);
    const decoded = tokenService.verifyToken(accessToken);
    req.user = decoded;
    next();
};
