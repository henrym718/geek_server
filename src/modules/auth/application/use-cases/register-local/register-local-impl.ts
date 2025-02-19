import { IUserRepository } from "@User/application/ports/user.repository";
import { IHashService } from "@Auth/application/services/hash.service";
import { ITokenService } from "@Shared/services/token/token.service";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { IRegisterLocalUseCase } from "./register-local.use-case";
import { ReqRegisterLocalDto, ResRegisterLocalDto } from "./register-local.dto";
import { HttpException } from "@Common/exceptions/http.exception";
import { User } from "@Core/entities/user";
import { EmailVO, IdVO, PasswordVO, ProviderEnum, ProviderVO, RoleVO, TokenVO } from "@Core/value-objects";
import { injectable, inject } from "inversify";
import { AUTH_SYMBOL } from "@Auth/infraestructure/container/auth.symbol";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";

@injectable()
export class RegisterUserUseCase implements IRegisterLocalUseCase {
    constructor(
        @inject(AUTH_SYMBOL.UserRepository) private readonly userRepository: IUserRepository,
        @inject(AUTH_SYMBOL.HashService) private readonly hashService: IHashService,
        @inject(SHARED_SYMBOLS.TokenService) private readonly tokenService: ITokenService,
        @inject(SHARED_SYMBOLS.UUIDService) private readonly idService: IUUIDService
    ) {}

    async execute(registerData: ReqRegisterLocalDto): Promise<ResRegisterLocalDto> {
        const { email, password, role } = registerData;

        const existingUser = await this.userRepository.findbyEmail(email.toLowerCase());
        if (existingUser) throw HttpException.badRequest("User already exists");

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
