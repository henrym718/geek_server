import { CheckUsernameExistsRequest, CheckUsernameExistsResponse } from "./check-username-exists.dto";

export interface ICheckUsernameExistsUseCase {
    execute(request: CheckUsernameExistsRequest): Promise<CheckUsernameExistsResponse>;
}
