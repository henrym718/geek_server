import { IUserRepository } from "@User/application/ports/user.repository";
import { ReqGetCurrentAccountDTO, ResGetCurrentAccountDTO } from "./get-current-account.dto";
import { IGetCurrentAccountUseCase } from "./get-current-account.use-case";
import { inject, injectable } from "inversify";
import { AUTH_SYMBOL } from "@Auth/infraestructure/container/auth.symbol";
import { EmailVO } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";
import { buildGetAccountCurrent } from "../helpers/auth-response.helper";

@injectable()
export class GetCurrentAccountUseCase implements IGetCurrentAccountUseCase {
    constructor(@inject(AUTH_SYMBOL.UserRepository) private readonly userRepository: IUserRepository) {}

    async execute(data: ReqGetCurrentAccountDTO): Promise<ResGetCurrentAccountDTO> {
        const userEmail = EmailVO.create(data.email).getValue();

        const userFounded = await this.userRepository.findUserByEmailWithProfile(userEmail);
        if (!userFounded) throw HttpException.notFound("User not found");
        const { user, client, vendor } = userFounded;
        return buildGetAccountCurrent(user, client ?? undefined, vendor ?? undefined);
    }
}
