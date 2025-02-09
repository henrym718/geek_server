import { HttpException } from "@Common/http.exception";

export class TokenVO {
    private constructor(private readonly value: string) {}

    public static create(token: string): TokenVO {
        this.validateToken(token);
        return new TokenVO(token);
    }

    private static validateToken(token: string) {
        if (!token) {
            throw HttpException.badRequest("Token required∫");
        }
    }

    public getValue() {
        return this.value;
    }
}
