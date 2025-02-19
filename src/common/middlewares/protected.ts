import { HttpException } from "@Common/exceptions/http.exception";
import { sharedContainer } from "@Shared/container/shared.container";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { ITokenService } from "@Shared/services/token/token.service";
import { NextFunction, Request, Response } from "express";

export const protect = (req: Request, res: Response, next: NextFunction) => {
    const header = req.header("Authorization");
    if (!header) throw HttpException.forbidden("Token not provided");
    if (!header.startsWith("Bearer ")) throw HttpException.forbidden("Invalid token format");

    const token = header.split(" ")[1];
    const tokenService = sharedContainer.get<ITokenService>(SHARED_SYMBOLS.TokenService);
    const decoded = tokenService.verifyToken(token);
    req.user = decoded;

    next();
};
