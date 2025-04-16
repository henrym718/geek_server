import { HttpException } from "@Common/exceptions/http.exception";

export enum ProjectWorkloadEnum {
    LT_TEN = "LT_TEN",
    TEN_TWENTY = "TEN_TWENTY",
    TWENTY_THIRTY = "TWENTY_THIRTY",
    THIRTY_FORTY = "THIRTY_FORTY",
    GT_FORTY = "GT_FORTY",
    VARIABLE = "VARIABLE",
    FLEXIBLE = "FLEXIBLE",
}

export class ProjectWorkloadVO {
    private constructor(private readonly value: ProjectWorkloadEnum) {}

    public static fromPlainText(value: string): ProjectWorkloadVO {
        const normalized = value.toUpperCase();
        const enumValue = ProjectWorkloadEnum[normalized as keyof typeof ProjectWorkloadEnum];
        if (!enumValue) {
            throw HttpException.badRequest(`Invalid project workload: ${value}`);
        }
        return new ProjectWorkloadVO(enumValue);
    }

    public static fromEnum(value: ProjectWorkloadEnum): ProjectWorkloadVO {
        return new ProjectWorkloadVO(value);
    }

    public getValue(): ProjectWorkloadEnum {
        return this.value;
    }

    public equals(value: ProjectWorkloadVO): boolean {
        return this.value === value.getValue();
    }
}
