import { IUserRepository } from "@User/application/repositories/user.repository";
import { ReqGetCurrentAccountDTO, ResGetCurrentAccountDTO } from "./get-current-account.dto";
import { IGetCurrentAccountUseCase } from "./get-current-account.use-case";
import { inject, injectable } from "inversify";
import { EmailVO } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";
import { buildResGetCurrentAccount } from "../helpers/auth-response.helper";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";

@injectable()
export class GetCurrentAccountUseCase implements IGetCurrentAccountUseCase {
    constructor(@inject(SHARED_SYMBOLS.UserRepository) private readonly userRepository: IUserRepository) {}

    async execute(data: ReqGetCurrentAccountDTO): Promise<ResGetCurrentAccountDTO> {
        const userEmail = EmailVO.create(data.email).getValue();
        const userFounded = await this.userRepository.findUserByEmailWithProfile(userEmail);
        if (!userFounded) throw HttpException.notFound("User not found");
        const { user, client, vendor } = userFounded;
        return buildResGetCurrentAccount(user, client ?? undefined, vendor ?? undefined);
    }
}
