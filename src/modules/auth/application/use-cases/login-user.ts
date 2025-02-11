import { IUserRepository } from "@User/application/ports/user.repository";
import { IHashService } from "@Auth/application/interfaces/services/hash.service";
import { ITokenService } from "@Auth/application/interfaces/services/token.service";
import { ILoginUserUseCase } from "../interfaces/use-cases/login-user.use-case";
import { AuthResponseDto } from "@Auth/application/dtos/auth-response.dto";
import { LoginUserDto } from "../dtos/login-user.dto";
import { HttpException } from "@Common/exceptions/http.exception";
import { EmailVO, PasswordVO, TokenVO } from "@Core/value-objects";
import { inject, injectable } from "inversify";
import { AUTH_SYMBOL } from "@Auth/infraestructure/container/auth.symbol";

@injectable()
export class LoginUser implements ILoginUserUseCase {
    constructor(
        @inject(AUTH_SYMBOL.UserRepository) private readonly userRepository: IUserRepository,
        @inject(AUTH_SYMBOL.TokenService) private readonly tokenService: ITokenService,
        @inject(AUTH_SYMBOL.HashService) private readonly hashService: IHashService
    ) {}

    async execute(loginData: LoginUserDto): Promise<AuthResponseDto> {
        const { email, password } = loginData;

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
