import { IUserRepository } from "@User/application/ports/user.repository";
import { IHashService } from "@Auth/application/services/hash.service";
import { ITokenService } from "@Shared/services/token/token.service";
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

        const foundUser = await this.userRepository.findUserByEmailWithProfile(userEmail.getValue());

        if (!foundUser) {
            throw HttpException.badRequest("User not exists");
        }

        const { user, client, vendor } = foundUser;
        const isPasswordValid = await this.hashService.check(userPassword.getValue(), user.password?.getValue() ?? "");
        if (!isPasswordValid) {
            throw HttpException.badRequest("Credentials are incorrects");
        }

        const payload = { email: user.email.getValue(), role: user.role.getValue(), userId: user.id.getValue() };
        const accessToken = this.tokenService.generateAccessToken(payload);
        const refreshToken = this.tokenService.generateRefreshToken(payload);

        const updatedUser = user.updateRefreshToken(TokenVO.create(refreshToken));
        await this.userRepository.update(updatedUser);

        const response: ResLoginLocalDto = {
            id: user.id.getValue(),
            email: user.email.getValue(),
            role: user.role.getValue(),
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            profileCompleted: !!client || !!vendor,
            accessToken,
        };

        if (client) {
            response.clientProfile = {
                firstName: client.firstName.getValue(),
                lastName: client.lastName.getValue(),
                city: client.city.getValue(),
                photo: client.photo?.getValue(),
            };
        }

        if (vendor) {
            response.vendorProfile = {
                firstName: vendor.firstName.getValue(),
                lastName: vendor.lastName.getValue(),
                city: vendor.city.getValue(),
                phone: vendor.phone.getValue(),
                photo: vendor.photo?.getValue(),
            };
        }

        return response;
    }
}
