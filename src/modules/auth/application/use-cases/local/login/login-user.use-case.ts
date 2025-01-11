import { AuthResponseDto } from "@Auth/application/dtos/auth-response.dto";
import { LoginUserDto } from "./login-user.dto";

export interface LoginUserUseCase {
    execute(loginData: LoginUserDto): Promise<AuthResponseDto>;
}
