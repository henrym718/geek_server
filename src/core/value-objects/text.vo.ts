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
    }

    public isEqual(other: TextVO): boolean {
        return this.value === other.value;
    }

    public getValue(): string {
        return this.value;
    }
}
