import { HttpException } from "@Common/exceptions/http.exception";

enum ProjectTypeEnum {
    ONE_TIME = "ONE_TIME",
    RECURRING = "RECURRING",
}

export class ProjectTypeVO {
    private constructor(private readonly value: ProjectTypeEnum) {}

    public static fromPlainText(value: string): ProjectTypeVO {
        const normalized = value.toUpperCase();
        const enumValue = ProjectTypeEnum[normalized as keyof typeof ProjectTypeEnum];
        if (!enumValue) {
            throw HttpException.badRequest(`Invalid project type: ${value}`);
        }
        return new ProjectTypeVO(enumValue);
    }

    public static fromEnum(value: ProjectTypeEnum): ProjectTypeVO {
        return new ProjectTypeVO(value);
    }

    public getValue(): ProjectTypeEnum {
        return this.value;
    }

    public equals(value: ProjectTypeVO): boolean {
        return this.value === value.getValue();
    }
}
