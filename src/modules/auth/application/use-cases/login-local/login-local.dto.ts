import { ResGetCurrentAccountDTO } from "../get-current-account/get-current-account.dto";

export interface ReqLoginLocalDto {
    email: string;
    password: string;
}

export interface ResLoginLocalDto extends ResGetCurrentAccountDTO {
    accessToken: string;
}
