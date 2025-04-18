import { inject, injectable } from "inversify";
import { CheckEmailRequest, CheckEmailResponse } from "./check-email-exists.dto";
import { ICheckEmailExistsUseCase } from "./check-email-exists.use-case";
import { AUTH_SYMBOL } from "@Auth/infraestructure/container/auth.symbol";
import { IUserRepository } from "@User/application/repositories/user.repository";
import { EmailVO } from "@Core/value-objects";

@injectable()
export class CheckEmailExistsUseCase implements ICheckEmailExistsUseCase {
    constructor(
        @inject(AUTH_SYMBOL.UserRepository)
        private readonly userRepository: IUserRepository
    ) {}
    async execute(data: CheckEmailRequest): Promise<CheckEmailResponse> {
        const email = EmailVO.create(data.email);
        const user = await this.userRepository.findbyEmail(email.getValue());
        return { exists: !!user };
    }
}
