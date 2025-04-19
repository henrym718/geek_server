import { HttpException } from "@Common/exceptions/http.exception";

export enum StatusRequestEnum {
    ACTIVE = "ACTIVE",
    ANNULLED = "ANNULLED",
    FINISHED = "FINISHED",
    MATCHED = "MATCHED",
}

export class StatusRequestVO {
    private constructor(private readonly value: StatusRequestEnum) {}

    public static fromPlainText(status: string): StatusRequestVO {
        const normalized = status.toUpperCase();
        const statusEnum = StatusRequestEnum[normalized as keyof typeof StatusRequestEnum];
        if (!statusEnum) throw HttpException.badRequest(`Invalid status: ${normalized}`);
        return new StatusRequestVO(statusEnum);
    }

    public static fromEnum(status: StatusRequestEnum): StatusRequestVO {
        return new StatusRequestVO(status);
    }

    public equals(other: StatusRequestVO): boolean {
        return this.value === other.value;
    }

    public getValue(): StatusRequestEnum {
        return this.value;
    }
}
