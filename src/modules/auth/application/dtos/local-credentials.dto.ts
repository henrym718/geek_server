export interface LocalCredentialsDto {
    email: string;
    password: string;
    action: "login" | "register";
}
