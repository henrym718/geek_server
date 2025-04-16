import { HttpException } from "@Common/exceptions/http.exception";

export enum ProjectLengthEnum {
    SINGLE_DAY = "SINGLE_DAY",
    FEW_DAYS = "FEW_DAYS",
    ONE_WEEK = "ONE_WEEK",
    TWO_FOUR_WEEKS = "TWO_FOUR_WEEKS",
    ONE_THREE_MONTHS = "ONE_THREE_MONTHS",
    THREE_SIX_MONTHS = "THREE_SIX_MONTHS",
    GT_SIX_MONTHS = "GT_SIX_MONTHS",
    INDEFINITE = "INDEFINITE",
}

export class ProjectLengthVO {
    private constructor(private readonly value: ProjectLengthEnum) {}

    public static fromPlainText(value: string): ProjectLengthVO {
        const normalized = value.toUpperCase();
        const enumValue = ProjectLengthEnum[normalized as keyof typeof ProjectLengthEnum];
        if (!enumValue) {
            throw HttpException.badRequest(`Invalid project length: ${value}`);
        }
        return new ProjectLengthVO(enumValue);
    }

    public static fromEnum(value: ProjectLengthEnum): ProjectLengthVO {
        return new ProjectLengthVO(value);
    }

    public getValue(): ProjectLengthEnum {
        return this.value;
    }

    public equals(value: ProjectLengthVO): boolean {
        return this.value === value.getValue();
    }
}
