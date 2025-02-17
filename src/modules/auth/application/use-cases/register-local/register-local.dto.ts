export interface ReqRegisterLocalDto {
    role: string;
    email: string;
    password: string;
}

export interface ResRegisterLocalDto {
    accessToken: string;
}
