import { HttpException } from "@Common/exceptions/http.exception";

export enum StatusEnum {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
}

export class StatusVO {
    private constructor(private readonly value: StatusEnum) {}

    public static fromPlainText(status: string): StatusVO {
        const normalized = status.toUpperCase();
        const statusEnum = StatusEnum[normalized as keyof typeof StatusEnum];
        if (!statusEnum) throw HttpException.badRequest(`Invalid status: ${statusEnum}`);
        return new StatusVO(statusEnum);
    }

    public static fromEnum(status: StatusEnum): StatusVO {
        return new StatusVO(status);
    }

    public getValue(): StatusEnum {
        return this.value;
    }
}
