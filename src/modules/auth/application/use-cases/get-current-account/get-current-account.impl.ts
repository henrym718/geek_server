import { IUserRepository } from "@User/application/ports/user.repository";
import { ReqGetCurrentAccountDTO, ResGetCurrentAccountDTO } from "./get-current-account.dto";
import { IGetCurrentAccountUseCase } from "./get-current-account.use-case";
import { inject, injectable } from "inversify";
import { AUTH_SYMBOL } from "@Auth/infraestructure/container/auth.symbol";
import { IdVO } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";

@injectable()
export class GetCurrentAccountImpl implements IGetCurrentAccountUseCase {
    constructor(@inject(AUTH_SYMBOL.UserRepository) private readonly userRepository: IUserRepository) {}

    async execute(data: ReqGetCurrentAccountDTO): Promise<ResGetCurrentAccountDTO> {
        const userId = IdVO.create(data.id).getValue();

        const userFounded = await this.userRepository.findUserByIdWithProfile(userId);
        if (!userFounded) throw HttpException.notFound("User not found");

        const { user, client, vendor } = userFounded;

        const response: ResGetCurrentAccountDTO = {
            id: user.id.getValue(),
            email: user.email.getValue(),
            role: user.role.getValue(),
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            profileComplete: !!client || !!vendor,
        };

        if (client) {
            response.clientProfile = {
                firstName: client.firstName.getValue(),
                lastName: client.lastName.getValue(),
                city: client.city.getValue(),
                photo: client.photo?.getValue(),
            };
        }

        if (userFounded.vendor) {
            response.vendorProfile = {
                firstName: userFounded.vendor.firstName.getValue(),
                lastName: userFounded.vendor.lastName.getValue(),
                city: userFounded.vendor.city.getValue(),
                phone: userFounded.vendor.phone.getValue(),
                photo: userFounded.vendor.photo?.getValue(),
            };
        }

        return response;
    }
}
