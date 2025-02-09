import { IUserRepository } from "@User/application/ports/user.repository";
import { IHashService } from "@Auth/application/interfaces/services/hash.service";
import { ITokenService } from "@Auth/application/interfaces/services/token.service";
import { IUUIDService } from "@Auth/application/interfaces/services/uuid.service";
import { IRegisterUserUseCase } from "../interfaces/use-cases/register-user.use-case";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { AuthResponseDto } from "@Auth/application/dtos/auth-response.dto";
import { HttpException } from "@Common/http.exception";
import { User } from "core/domain/entities/user";
import { EmailVO, IdVO, PasswordVO, ProviderEnum, ProviderVO, RoleVO, TokenVO } from "@Core/domain/value-objects";
import { injectable, inject } from "inversify";
import { AUTH_SYMBOL } from "@Auth/infraestructure/container/auth.symbol";

@injectable()
export class RegisterUser implements IRegisterUserUseCase {
    constructor(
        @inject(AUTH_SYMBOL.UserRepository) private readonly userRepository: IUserRepository,
        @inject(AUTH_SYMBOL.HashService) private readonly hashService: IHashService,
        @inject(AUTH_SYMBOL.TokenService) private readonly tokenService: ITokenService,
        @inject(AUTH_SYMBOL.IdService) private readonly idService: IUUIDService
    ) {}

    async execute(registerData: RegisterUserDto): Promise<AuthResponseDto> {
        const { email, password, role } = registerData;

        const existingUser = await this.userRepository.findbyEmail(email.toLowerCase());
        if (existingUser) {
            throw HttpException.badRequest("User already exists");
        }

        const userId = IdVO.create(this.idService.generateUUID());
        const emailVO = EmailVO.create(email);
        const roleVO = RoleVO.fromPlainText(role);
        const passwordVO = PasswordVO.fromPlainText(password);
        const providerVO = ProviderVO.fromEnum(ProviderEnum.LOCAL);

        const hashedPassword = await this.hashService.hash(passwordVO.getValue());
        const hashedPasswordVO = PasswordVO.fromHash(hashedPassword);

        const tokenPayload = { userId: userId.getValue(), email: emailVO.getValue(), role: roleVO.getValue() };

        const accessToken = this.tokenService.generateAccessToken(tokenPayload);
        const refreshToken = this.tokenService.generateRefreshToken(tokenPayload);
        const refreshTokenVO = TokenVO.create(refreshToken);

        const user = User.create({
            id: userId,
            email: emailVO,
            provider: providerVO,
            password: hashedPasswordVO,
            role: roleVO,
            refreshToken: refreshTokenVO,
        });

        await this.userRepository.create(user);

        return { accessToken };
    }
}
