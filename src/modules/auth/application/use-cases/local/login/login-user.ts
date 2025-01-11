import { UserRepository } from "@User/application/ports/user.repository";
import { HashService } from "@Auth/application/ports/hash.service";
import { TokenService } from "@Auth/application/ports/token.service";
import { LoginUserUseCase } from "./login-user.use-case";
import { AuthResponseDto } from "@Auth/application/dtos/auth-response.dto";
import { LoginUserDto } from "./login-user.dto";
import { HttpException } from "@Common/http.exception";
import { EmailVO, PasswordVO, TokenVO } from "@Domain/value-objects";

export class LoginUser implements LoginUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenService: TokenService,
        private readonly hashService: HashService
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
        const accessToken = await this.tokenService.generateAccessToken(payload);
        const refreshToken = await this.tokenService.generateRefreshToken(payload);

        const updatedUser = foundUser.updateRefreshToken(TokenVO.create(refreshToken));
        await this.userRepository.save(updatedUser);

        return { accessToken };
    }
}
