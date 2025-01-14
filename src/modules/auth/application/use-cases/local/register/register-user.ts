import { UserRepository } from "@User/application/ports/user.repository";
import { HashService } from "@Auth/application/ports/hash.service";
import { TokenService } from "@Auth/application/ports/token.service";
import { IdService } from "@Auth/application/ports/uuid.service";
import { RegisterUserUseCase } from "./register-user.use-case";
import { RegisterUserDto } from "./register-user.dto";
import { AuthResponseDto } from "@Auth/application/dtos/auth-response.dto";
import { HttpException } from "@Common/http.exception";
import { User } from "@Domain/entities/user";
import { EmailVO, IdVO, PasswordVO, ProviderEnum, ProviderVO, RoleVO, TokenVO } from "@Domain/value-objects";
import { injectable, inject } from "inversify";
import { TYPES } from "@Auth/presentation/types/types";

@injectable()
export class RegisterUser implements RegisterUserUseCase {
    constructor(
        @inject(TYPES.UserRepository) private readonly userRepository: UserRepository,
        @inject(TYPES.HashService) private readonly hashService: HashService,
        @inject(TYPES.TokenService) private readonly tokenService: TokenService,
        @inject(TYPES.IdService) private readonly idService: IdService
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
