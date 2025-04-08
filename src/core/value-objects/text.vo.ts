import { HttpException } from "@Common/exceptions/http.exception";

export class TextVO {
    private constructor(private readonly value: string) {}

    public static create(fieldName: string, value: string): TextVO {
        const cleanedValue = value?.trim();
        this.validateName(fieldName, cleanedValue);
        return new TextVO(cleanedValue);
    }

    private static validateName(fieldName: string, value: string): void {
        if (!value) {
            throw HttpException.badRequest(`${fieldName} is required`);
        }

        if (value.length < 2) {
            throw HttpException.badRequest(`${fieldName} is too short`);
        }

        const invalidChars = /[^a-zA-ZñÑ\p{L}\s.,!?¿¡]/u;
        if (invalidChars.test(value)) {
            throw HttpException.badRequest(`${fieldName} contains invalid characters`);
        }
    }

    public isEqual(other: TextVO): boolean {
        return this.value === other.value;
    }

    public getValue(): string {
        return this.value;
    }
}
