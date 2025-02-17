import { IUserRepository } from "@User/application/ports/user.repository";
import { IHashService } from "@Auth/application/services/hash.service";
import { ITokenService } from "@Auth/application/services/token.service";
import { ILoginLocalUseCase } from "@Auth/application/use-cases/login-local/login-local.use-case";
import { ReqLoginLocalDto, ResLoginLocalDto } from "@Auth/application/use-cases/login-local/login-local.dto";
import { HttpException } from "@Common/exceptions/http.exception";
import { EmailVO, PasswordVO, TokenVO } from "@Core/value-objects";
import { AUTH_SYMBOL } from "@Auth/infraestructure/container/auth.symbol";
import { inject, injectable } from "inversify";

@injectable()
export class LoginLocalUserCase implements ILoginLocalUseCase {
    constructor(
        @inject(AUTH_SYMBOL.UserRepository) private readonly userRepository: IUserRepository,
        @inject(AUTH_SYMBOL.TokenService) private readonly tokenService: ITokenService,
        @inject(AUTH_SYMBOL.HashService) private readonly hashService: IHashService
    ) {}

    async execute(data: ReqLoginLocalDto): Promise<ResLoginLocalDto> {
        const { email, password } = data;

        const userEmail = EmailVO.create(email);
        const userPassword = PasswordVO.fromPlainText(password);

        const foundUser = await this.userRepository.findbyEmail(userEmail.getValue());
        if (!foundUser) {
            throw HttpException.badRequest("User not exists");
        }

        const isPasswordValid = await this.hashService.check(userPassword.getValue(), foundUser.password?.getValue() ?? "");
        if (!isPasswordValid) {
            throw HttpException.badRequest("Credentials are incorrects");
        }

        const payload = { email: foundUser.email.getValue(), role: foundUser.role.getValue(), userId: foundUser.id.getValue() };
        const accessToken = this.tokenService.generateAccessToken(payload);
        const refreshToken = this.tokenService.generateRefreshToken(payload);

        const updatedUser = foundUser.updateRefreshToken(TokenVO.create(refreshToken));
        await this.userRepository.update(updatedUser);

        return { accessToken };
    }
}
