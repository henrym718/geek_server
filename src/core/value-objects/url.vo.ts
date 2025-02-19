import { HttpException } from "@Common/exceptions/http.exception";

export class UrlVO {
    private static readonly STANDARD_REGEX = /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/;
    private static readonly S3_REGEX = /^https?:\/\/(?:[a-zA-Z0-9-]+\.)?s3\.[a-zA-Z0-9-]+\.amazonaws\.com\/[^\s]*$/;

    private constructor(private readonly value: string) {}

    public static create(value: string, type: "standard" | "s3" = "standard"): UrlVO {
        this.validateUrl(type, value);
        return new UrlVO(value);
    }

    private static validateUrl(type: "standard" | "s3", value: string) {
        const isValid = type === "standard" ? this.STANDARD_REGEX.test(value) : this.S3_REGEX.test(value);
        if (!isValid) throw HttpException.badRequest("Url not valid");
    }

    public getValue(): string {
        return this.value;
    }
}
