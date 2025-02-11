import { HttpException } from "@Common/exceptions/http.exception";

export class PasswordVO {
    private constructor(private readonly value: string, private readonly isHashed: boolean) {}

    public static fromPlainText(password: string): PasswordVO {
        this.validatePlainText(password);
        return new PasswordVO(password, false);
    }

    public static fromHash(hash: string): PasswordVO {
        this.validateHash(hash);
        return new PasswordVO(hash, true);
    }

    public equals(other: PasswordVO): boolean {
        if (this.isHashed !== other.isHashed) {
            return false;
        }
        return this.value === other.value;
    }

    public isHashedPassword(): boolean {
        return this.isHashed;
    }

    public getValue(): string {
        return this.value;
    }

    private static validatePlainText(password: string): void {
        if (!password) {
            throw HttpException.badRequest("Password is required");
        }

        if (!new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{5,}$/).test(password)) {
            throw HttpException.badRequest("Invalid password");
        }
    }

    private static validateHash(hash: string): void {
        if (!hash) {
            throw HttpException.badRequest("Hash is required");
        }
    }
}
