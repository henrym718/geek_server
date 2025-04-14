import { GetCurrentAccountRequest, GetCurrentAccountResponse } from "./get-current-account.dto";

export interface IGetCurrentAccountUseCase {
    execute(data: GetCurrentAccountRequest): Promise<GetCurrentAccountResponse>;
}
