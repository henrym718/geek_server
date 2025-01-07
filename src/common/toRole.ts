import { Role } from "../modules/user/domain/entities/user";
import { HttpException } from "./http.exception";

export const toRole = (role: string): Role => {
    const roleEnum = Role[role as keyof typeof Role];
    if (roleEnum === undefined) {
        throw HttpException.badRequest(`Invalid role: ${role}`);
    }
    return roleEnum;
};
