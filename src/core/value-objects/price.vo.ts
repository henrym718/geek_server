import { HttpException } from "@Common/exceptions/http.exception";

export class PriceVO {
    private constructor(private readonly value: number) {}

    public static create(number: number): PriceVO {
        this.validate(number);
        return new PriceVO(number);
    }

    private static validate(number: number) {
        if (!isFinite(number) || number <= 0) {
            throw HttpException.badRequest("Invalid price: must be a finite number greater than 0");
        }
    }

    public getValue(): number {
        return this.value;
    }
}
