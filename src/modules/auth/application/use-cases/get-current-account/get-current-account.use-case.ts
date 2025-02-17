import { ReqGetCurrentAccountDTO, ResGetCurrentAccountDTO } from "./get-current-account.dto";

export interface IGetCurrentAccountUseCase {
    execute(data: ReqGetCurrentAccountDTO): Promise<ResGetCurrentAccountDTO>;
}
