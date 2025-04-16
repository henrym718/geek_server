import { HttpException } from "@Common/exceptions/http.exception";

export enum BudgetUnitEnum {
    PROJECT = "PROJECT",
    HOUR = "HOUR",
    DAY = "DAY",
    WEEK = "WEEK",
    MONTH = "MONTH",
}

export class BudgetUnitVO {
    private constructor(private readonly value: BudgetUnitEnum) {}

    public static fromPlainText(value: string): BudgetUnitVO {
        const normalized = value.toUpperCase();
        const enumValue = BudgetUnitEnum[normalized as keyof typeof BudgetUnitEnum];
        if (!enumValue) {
            throw HttpException.badRequest(`Invalid budget unit: ${value}`);
        }
        return new BudgetUnitVO(enumValue);
    }

    public static fromEnum(value: BudgetUnitEnum): BudgetUnitVO {
        return new BudgetUnitVO(value);
    }

    public getValue(): BudgetUnitEnum {
        return this.value;
    }

    public equals(value: BudgetUnitVO): boolean {
        return this.value === value.getValue();
    }
}
