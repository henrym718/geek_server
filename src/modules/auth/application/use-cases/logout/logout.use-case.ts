import { LogoutResponse } from "./logout.dto";

export interface ILogoutUseCase {
    execute(userId: string): Promise<LogoutResponse>;
}
