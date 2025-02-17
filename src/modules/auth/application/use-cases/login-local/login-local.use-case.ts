import { ResLoginLocalDto, ReqLoginLocalDto } from "./login-local.dto";

export interface ILoginLocalUseCase {
    execute(data: ReqLoginLocalDto): Promise<ResLoginLocalDto>;
}
