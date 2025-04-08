import { IUserRepository } from "@User/application/repositories/user.repository";
import { CheckUsernameExistsRequest, CheckUsernameExistsResponse } from "./check-username-exists.dto";
import { ICheckUsernameExistsUseCase } from "./check-username-exists.use-case";
import { inject, injectable } from "inversify";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { UsernameVO } from "@Core/value-objects/username.vo";

@injectable()
export class CheckUsernameExistsUseCase implements ICheckUsernameExistsUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.UserRepository)
        private readonly userRepository: IUserRepository
    ) {}
    async execute(request: CheckUsernameExistsRequest): Promise<CheckUsernameExistsResponse> {
        const username = UsernameVO.create(request.username);
        const user = await this.userRepository.findByUsername(username.getValue());
        return { exists: !!user };
    }
}
