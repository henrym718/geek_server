export type TokenPayload = {
    userId: string;
    email: string;
    role: string;
};

export interface TokenService {
    generateAccessToken(payload: TokenPayload): Promise<string>;
    generateRefreshToken(payload: TokenPayload): Promise<string>;
    verifyAccessToken(token: string): Promise<TokenPayload | null>;
    verifyRefreshToken(token: string): Promise<TokenPayload | null>;
}
