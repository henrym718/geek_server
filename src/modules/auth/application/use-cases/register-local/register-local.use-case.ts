import { ReqRegisterLocalDto, ResRegisterLocalDto } from "./register-local.dto";

export interface IRegisterLocalUseCase {
    execute(registerData: ReqRegisterLocalDto): Promise<ResRegisterLocalDto>;
}
