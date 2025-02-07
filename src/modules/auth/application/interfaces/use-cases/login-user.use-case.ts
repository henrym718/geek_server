import { AuthResponseDto } from "@Auth/application/dtos/auth-response.dto";
import { LoginUserDto } from "../../dtos/login-user.dto";

export interface ILoginUserUseCase {
    execute(loginData: LoginUserDto): Promise<AuthResponseDto>;
}
