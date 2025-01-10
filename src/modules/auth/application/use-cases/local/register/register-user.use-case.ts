import { RegisterUserDto } from "./register-user.dto";
import { AuthResponseDto } from "@Auth/application/dtos/auth-response.dto";

export interface RegisterUserUseCase {
    execute(registerData: RegisterUserDto): Promise<AuthResponseDto>;
}
