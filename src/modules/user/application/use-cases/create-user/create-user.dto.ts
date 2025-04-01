import { User } from "@Core/entities/user";

export interface CreateUserRequest {
    role: string;
    email: string;
    password: string;
}

export interface CreateUserResponse {
    user: User;
    accessToken: string;
}
