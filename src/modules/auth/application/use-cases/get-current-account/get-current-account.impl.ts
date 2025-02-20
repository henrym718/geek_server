import { IUserRepository } from "@User/application/ports/user.repository";
import { ReqGetCurrentAccountDTO, ResGetCurrentAccountDTO } from "./get-current-account.dto";
import { IGetCurrentAccountUseCase } from "./get-current-account.use-case";
import { inject, injectable } from "inversify";
import { AUTH_SYMBOL } from "@Auth/infraestructure/container/auth.symbol";
import { EmailVO } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";

@injectable()
export class GetCurrentAccountUseCase implements IGetCurrentAccountUseCase {
    constructor(@inject(AUTH_SYMBOL.UserRepository) private readonly userRepository: IUserRepository) {}

    async execute(data: ReqGetCurrentAccountDTO): Promise<ResGetCurrentAccountDTO> {
        const userEmail = EmailVO.create(data.email).getValue();

        const userFounded = await this.userRepository.findUserByEmailWithProfile(userEmail);
        if (!userFounded) throw HttpException.notFound("User not found");

        const { user, client, vendor } = userFounded;

        const response: ResGetCurrentAccountDTO = {
            id: user.id.getValue(),
            email: user.email.getValue(),
            role: user.role.getValue(),
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            profileCompleted: !!client || !!vendor,
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
