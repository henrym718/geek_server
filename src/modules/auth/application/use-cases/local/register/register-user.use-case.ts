import { AuthRequestDto } from "modules/pruebas/application/dtos/auth-request.dto";
import { RegisterUserDto } from "./register-user.dto";

export interface RegisterUserUseCase {
    execute(credentials: RegisterUserDto): Promise<AuthRequestDto>;
}
