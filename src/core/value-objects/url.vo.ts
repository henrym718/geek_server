import { HttpException } from "@Common/exceptions/http.exception";

export class UrlVO {
    private static readonly STANDARD_REGEX = /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/;
    private static readonly S3_REGEX =
        /^https?:\/\/([a-zA-Z0-9-]+)\.s3(\.[a-zA-Z0-9-]+)?\.amazonaws\.com\/([a-zA-Z0-9\-\/]+)\.(jpg|jpeg|png|gif|bmp|tiff)$/;

    private constructor(private readonly url: string) {}

    public static create(url: string, type: "standard" | "s3"): UrlVO {
        this.validateUrl(type, url);
        return new UrlVO(url);
    }

    private static validateUrl(type: "standard" | "s3", url: string | undefined | null) {
        if (!url) throw HttpException.badRequest("Url is required");
        const isValid = type === "standard" ? this.STANDARD_REGEX.test(url) : this.S3_REGEX.test(url);
        if (!isValid) throw HttpException.badRequest("Url not valid");
    }

    public getValue(): string {
        return this.url;
    }
}
