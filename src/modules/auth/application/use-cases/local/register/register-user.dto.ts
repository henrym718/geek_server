import { RoleEnum } from "@Domain/entities/user";

export interface RegisterUserDto {
    role: RoleEnum;
    email: string;
    password: string;
}
