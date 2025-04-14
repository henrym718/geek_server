import { AccessToken } from "@Common/dtos/global.dtos";

export interface ReqLoginLocalDto {
    email: string;
    password: string;
}

export interface ResLoginLocalDto extends AccessToken {}
