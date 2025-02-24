import { ReqCreateClientDTO, ResCreateClientDTO } from "./create-client.cto";

export interface ICreateClientUseCase {
    execute(data: ReqCreateClientDTO): Promise<ResCreateClientDTO>;
}
