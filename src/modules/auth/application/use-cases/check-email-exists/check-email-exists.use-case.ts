import { CheckEmailRequest, CheckEmailResponse } from "./check-email-exists.dto";

export interface ICheckEmailExistsUseCase {
    execute(data: CheckEmailRequest): Promise<CheckEmailResponse>;
}
