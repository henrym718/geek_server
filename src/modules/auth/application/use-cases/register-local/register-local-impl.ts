import { IRegisterLocalUseCase } from "./register-local.use-case";
import { RegisterLocalRequest, RegisterLocalResponse } from "./register-local.dto";
import { injectable, inject } from "inversify";
import { USER_SYMBOLS } from "@User/infrastructure/container/user.symbol";
import { ICreateUserUseCase } from "@User/application/use-cases/create-user/create-user.use-case";
import { ICreateClientUseCase } from "@Client/application/use-cases/create-client/create-client.use-case";
import { CLIENT_SYMBOLS } from "@Client/infraestructure/container/client.symbols";
import { VENDOR_SYMBOLS } from "@Vendor/infraestructure/container/vendor.symbol";
import { ICreateVendorUseCase } from "@Vendor/application/use-cases/create-vendor/create-vendor.use-case";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { ITransactionManager } from "@Shared/services/transaction/transaction-manager.interface";
import { IUserRepository } from "@User/application/repositories/user.repository";
import { IClientRepository } from "@Client/application/repositories/client.repository";
import { IVendorRepository } from "@Vendor/application/repositories/vendor.repository";
import { RoleEnum } from "@Core/value-objects";
import { HttpException } from "@Common/exceptions/http.exception";
import { Client } from "@Core/entities/client";
import { Vendor } from "@Core/entities/vendor";
import { User } from "@Core/entities/user";
import { Prisma } from "@prisma/client";
@injectable()
export class RegisterUserUseCase implements IRegisterLocalUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.UserRepository) private readonly userRepository: IUserRepository,
        @inject(SHARED_SYMBOLS.VendorRepository) private readonly vendorRepository: IVendorRepository,
        @inject(SHARED_SYMBOLS.ClientRepository) private readonly clientRepository: IClientRepository,
        @inject(SHARED_SYMBOLS.TransactionManager) private readonly transactionManager: ITransactionManager,
        @inject(USER_SYMBOLS.CreateUser) private readonly createUserUseCase: ICreateUserUseCase,
        @inject(CLIENT_SYMBOLS.CreateClient) private readonly createClientUseCase: ICreateClientUseCase,
        @inject(VENDOR_SYMBOLS.CreateVendor) private readonly createVendorUseCase: ICreateVendorUseCase
    ) {}
    async execute(registerData: RegisterLocalRequest): Promise<RegisterLocalResponse> {
        const { email, password, role, firstName, lastName, city, phone, photo } = registerData;

        const userEntityData = await this.createUserUseCase.execute({ email, password, role });
        const userEntity = userEntityData.user;
        const accessToken = userEntityData.accessToken;

        await this.transactionManager.runInTransaction(async (ctx: Prisma.TransactionClient) => {
            await this.userRepository.create(userEntity, ctx);

            if (userEntity.role.getValue() === RoleEnum.CLIENT) {
                const { client } = await this.createClientUseCase.execute({
                    id: userEntity.id.getValue(),
                    firstName,
                    lastName,
                    city,
                    phone,
                    photo,
                });
                await this.clientRepository.create(client, ctx);
            }

            if (userEntity.role.getValue() === RoleEnum.VENDOR) {
                const { vendor } = await this.createVendorUseCase.execute({
                    id: userEntity.id.getValue(),
                    firstName,
                    lastName,
                    city,
                    phone,
                    photo,
                });
                await this.vendorRepository.create(vendor, ctx);
            }
        });

        const userWithProfile = await this.userRepository.findUserByEmailWithProfile(userEntity.email.getValue());
        if (!userWithProfile) throw HttpException.badRequest("Error al crear el usuario");
        const { user, vendor, client } = userWithProfile;
        return this.buildResponse(user, accessToken, vendor ?? undefined, client ?? undefined);
    }

    private buildResponse(user: User, accessToken: string, vendor?: Vendor, client?: Client): RegisterLocalResponse {
        const response: RegisterLocalResponse = {
            accessToken,
            user: {
                id: user.id.getValue(),
                email: user.email.getValue(),
                role: user.role.getValue(),
                profileCompleted: !!client || !!vendor,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                isActive: user.isActive,
            },
        };

        if (client) {
            response.client = {
                id: client.id.getValue(),
                firstName: client.firstName.getValue(),
                lastName: client.lastName.getValue(),
                city: client.city.getValue(),
                phone: client.phone.getValue(),
                photo: client.photo?.getValue(),
            };
        }

        if (vendor) {
            response.vendor = {
                id: vendor.id.getValue(),
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
