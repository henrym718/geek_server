import { ResGetCurrentAccountDTO } from "../get-current-account/get-current-account.dto";

export interface ReqRegisterLocalDto {
    role: string;
    email: string;
    password: string;
}

export interface ResRegisterLocalDto extends ResGetCurrentAccountDTO {
    accessToken: string;
}
