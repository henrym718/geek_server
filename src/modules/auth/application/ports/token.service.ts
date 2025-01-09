type TokenPayload = {
    id: string;
    email: string;
    role: string;
};

export interface TokenService {
    create(data: TokenPayload): Promise<string>;
    verify(token: string): Promise<TokenPayload | null>;
}
