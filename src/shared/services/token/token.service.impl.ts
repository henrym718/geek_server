import jwt from "jsonwebtoken";
import { TokenPayload, ITokenService } from "./token.service";
import { EnvBootstrap } from "@Bootstraps/env.bootstrap";
import { HttpException } from "@Common/exceptions/http.exception";
import { injectable } from "inversify";

@injectable()
export class TokenServiceImpl implements ITokenService {
    generateAccessToken(payload: TokenPayload): string {
        const ENV = EnvBootstrap.ENV;
        return jwt.sign(payload, ENV.KEY_SECRET_TOKEN, { expiresIn: ENV.ACCESS_TOKEN_EXPIRATION });
    }

    generateRefreshToken(payload: TokenPayload): string {
        const ENV = EnvBootstrap.ENV;
        return jwt.sign(payload, ENV.KEY_SECRET_TOKEN, { expiresIn: ENV.REFRESH_TOKEN_EXPIRATION });
    }

    verifyToken(token: string): TokenPayload {
        try {
            const ENV = EnvBootstrap.ENV;
            return jwt.verify(token, ENV.KEY_SECRET_TOKEN) as TokenPayload;
        } catch {
            throw HttpException.unauthorized("Token invalid");
        }
    }
}
