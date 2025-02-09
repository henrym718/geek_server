import { HttpException } from "@Common/http.exception";

export enum RoleEnum {
    CLIENT = "CLIENT",
    VENDOR = "VENDOR",
}

export class RoleVO {
    private constructor(private readonly role: RoleEnum) {}

    public static fromPlainText(role: string): RoleVO {
        const normalized = role.toUpperCase();
        const enumRole = RoleEnum[normalized as keyof typeof RoleEnum];
        if (!enumRole) {
            throw HttpException.badRequest(`Invalid role: ${role}`);
        }
        return new RoleVO(enumRole);
    }

    static fromEnum(role: RoleEnum): RoleVO {
        return new RoleVO(role);
    }

    equals(role: RoleVO): boolean {
        return this.role === role.getValue();
    }

    getValue(): RoleEnum {
        return this.role;
    }
}
