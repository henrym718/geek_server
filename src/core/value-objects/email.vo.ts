import { HttpException } from "@Common/exceptions/http.exception";

export class EmailVO {
    private constructor(private readonly value: string) {}

    public static create(email: string): EmailVO {
        const normalized = email.toLowerCase();
        this.validateEmail(normalized);
        return new EmailVO(normalized);
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
