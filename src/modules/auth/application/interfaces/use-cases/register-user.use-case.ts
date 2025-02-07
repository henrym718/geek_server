import { RegisterUserDto } from "../../dtos/register-user.dto";
import { AuthResponseDto } from "@Auth/application/dtos/auth-response.dto";

export interface IRegisterUserUseCase {
    execute(registerData: RegisterUserDto): Promise<AuthResponseDto>;
}
