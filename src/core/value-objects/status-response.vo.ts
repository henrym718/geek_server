import { HttpException } from "@Common/exceptions/http.exception";

export enum StatusResponseEnum {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
}

export class StatusResponseVO {
    private constructor(private readonly value: StatusResponseEnum) {}

    public static fromPlainText(status: string): StatusResponseVO {
        const normalized = status.toUpperCase();
        const statusEnum = StatusResponseEnum[normalized as keyof typeof StatusResponseEnum];
        if (!statusEnum) throw HttpException.badRequest(`Invalid status: ${normalized}`);
        return new StatusResponseVO(statusEnum);
    }

    public static fromEnum(status: StatusResponseEnum): StatusResponseVO {
        return new StatusResponseVO(status);
    }

    public equals(other: StatusResponseVO): boolean {
        return this.value === other.value;
    }

    public getValue(): StatusResponseEnum {
        return this.value;
    }
}
