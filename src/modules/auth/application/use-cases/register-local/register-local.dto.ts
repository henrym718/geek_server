import { AccessToken } from "@Common/dtos/global.dtos";

export interface RegisterLocalRequest {
    role: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    city: string;
    phone: string;
    photo?: string;
    username: string;
}

export interface RegisterLocalResponse {
    accessToken: AccessToken;
}
