export type TokenPayload = {
    userId: string;
    email: string;
    role: string;
};

export interface ITokenService {
    generateAccessToken(payload: TokenPayload): string;
    generateRefreshToken(payload: TokenPayload): string;
    verifyToken(token: string): TokenPayload;
}
