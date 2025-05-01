import { IUserRepository } from "@User/application/repositories/user.repository";
import { ILogoutUseCase } from "./logout.use-case";
import { HttpException } from "@Common/exceptions/http.exception";
import { LogoutResponse } from "./logout.dto";
import { AUTH_SYMBOL } from "@Auth/infraestructure/container/auth.symbol";
import { inject, injectable } from "inversify";

@injectable()
export class LogoutUseCase implements ILogoutUseCase {
    constructor(
        @inject(AUTH_SYMBOL.UserRepository)
        private readonly userRepository: IUserRepository
    ) {}

    async execute(userId: string): Promise<LogoutResponse> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw HttpException.notFound("User not found");
        }

        const updatedUser = user.removeRefreshToken();
        await this.userRepository.update(updatedUser);

        return {
            details: "Logout successful",
        };
    }
}
