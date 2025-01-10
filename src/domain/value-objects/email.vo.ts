import { HttpException } from "@Common/http.exception";

export class EmailVO {
    private constructor(private readonly value: string) {}

    public static create(email: string): EmailVO {
        this.validateEmail(email);
        return new EmailVO(email);
    }

    private static validateEmail(email: string): void {
        if (!email) {
            throw HttpException.badRequest("Email is required");
        }

        if (!new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) {
            throw HttpException.badRequest("Invalid email");
        }
    }

    public getValue(): string {
        return this.value;
    }
}
