import { RoleEnum } from "@Domain/entities/user";
import { HttpException } from "./http.exception";

export const toRole = (role: string): RoleEnum => {
    const roleEnum = RoleEnum[role as keyof typeof RoleEnum];
    if (roleEnum === undefined) {
        throw HttpException.badRequest(`Invalid role: ${role}`);
    }
    return roleEnum;
};
