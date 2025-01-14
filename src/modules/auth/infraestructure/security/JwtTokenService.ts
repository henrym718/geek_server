import jwt from "jsonwebtoken";
import { TokenPayload, TokenService } from "@Auth/application/ports/token.service";
import { EnvBootstrap } from "@Bootstraps/env.bootstrap";
import { HttpException } from "@Common/http.exception";

export class JwtTokenService implements TokenService {
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
