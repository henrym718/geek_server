import { RegisterLocalRequest, RegisterLocalResponse } from "./register-local.dto";

export interface IRegisterLocalUseCase {
    execute(registerData: RegisterLocalRequest): Promise<RegisterLocalResponse>;
}
