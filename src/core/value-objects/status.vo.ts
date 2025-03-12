import { HttpException } from "@Common/exceptions/http.exception";

export enum StatusEnum {
    ACTIVE = "ACTIVE",
    CANCELED = "CANCELED",
    FINISHED = "FINISHED",
    ACCEPTED = "ACCEPTED",
    REJECTED = "REJECTED",
}

export class StatusVO {
    private constructor(private readonly value: StatusEnum) {}

    public static fromPlainText(status: string): StatusVO {
        const normalized = status.toUpperCase();
        const statusEnum = StatusEnum[normalized as keyof typeof StatusEnum];
        if (!statusEnum) throw HttpException.badRequest(`Invalid status: ${normalized}`);
        return new StatusVO(statusEnum);
    }

    public static fromEnum(status: StatusEnum): StatusVO {
        return new StatusVO(status);
    }

    public equals(other: StatusVO): boolean {
        return this.value === other.value;
    }

    public getValue(): StatusEnum {
        return this.value;
    }
}
