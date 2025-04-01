import { inject, injectable } from "inversify";
import { CreateUserRequest, CreateUserResponse } from "./create-user.dto";
import { ICreateUserUseCase } from "./create-user.use-case";
import { EmailVO, IdVO, PasswordVO, ProviderEnum, ProviderVO, RoleVO, TokenVO } from "@Core/value-objects";
import { IUserRepository } from "@User/application/repositories/user.repository";
import { HttpException } from "@Common/exceptions/http.exception";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { ITokenService } from "@Shared/services/token/token.service";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { IHashService } from "@Shared/services/hash/hash.service";
import { User } from "@Core/entities/user";

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.UserRepository)
        private readonly userRepository: IUserRepository,

        @inject(SHARED_SYMBOLS.TokenService)
        private readonly tokenService: ITokenService,

        @inject(SHARED_SYMBOLS.HashService)
        private readonly hashService: IHashService,

        @inject(SHARED_SYMBOLS.UUIDService)
        private readonly idService: IUUIDService
    ) {}

    async execute(data: CreateUserRequest): Promise<CreateUserResponse> {
        const { role, email, password } = data;

        const existingUser = await this.userRepository.findbyEmail(email.toLowerCase());
        if (existingUser) throw HttpException.badRequest("User already exists");

        const userId = IdVO.create(this.idService.generateUUID());
        const providerVO = ProviderVO.fromEnum(ProviderEnum.LOCAL);
        const roleVO = RoleVO.fromPlainText(role);
        const emailVO = EmailVO.create(email);
        const passwordVO = PasswordVO.fromPlainText(password);

        const hashedPassword = await this.hashService.hash(passwordVO.getValue());
        const hashedPasswordVO = PasswordVO.fromHash(hashedPassword);

        const tokenPayload = { userId: userId.getValue(), email: emailVO.getValue(), role: roleVO.getValue() };

        const accessToken = this.tokenService.generateAccessToken(tokenPayload);
        const refreshToken = this.tokenService.generateRefreshToken(tokenPayload);
        const refreshTokenVO = TokenVO.create(refreshToken);

        const newUser = User.create({
            id: userId,
            provider: providerVO,
            email: emailVO,
            password: hashedPasswordVO,
            role: roleVO,
            refreshToken: refreshTokenVO,
        });

        return {
            user: newUser,
            accessToken,
        };
    }
}
