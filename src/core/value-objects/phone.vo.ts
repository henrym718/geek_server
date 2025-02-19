import { HttpException } from "@Common/exceptions/http.exception";

export class PhoneVO {
    private static readonly EC_PHONE_REGEX = /^09\d{8}$/;
    private constructor(private readonly value: string) {}

    public static create(phone: string): PhoneVO {
        this.validatePhone(phone);
        return new PhoneVO(phone);
    }

    private static validatePhone(phone: string) {
        if (!this.EC_PHONE_REGEX.test(phone)) {
            throw HttpException.badRequest("Phone is not correct");
        }
    }

    public getValue(): string {
        return this.value;
    }
}
