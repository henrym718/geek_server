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
        const { email, password, username, role, firstName, lastName, city, phone, photo } = registerData;
        const { user, accessToken } = await this.createUserUseCase.execute({ email, password, username, role });
        await this.transactionManager.runInTransaction(async (ctx: Prisma.TransactionClient) => {
            await this.userRepository.create(user, ctx);

            if (user.role.getValue() === RoleEnum.CLIENT) {
                const { client } = await this.createClientUseCase.execute({
                    id: user.id.getValue(),
                    firstName,
                    lastName,
                    city,
                    phone,
                    photo,
                });
                await this.clientRepository.create(client, ctx);
            }

            if (user.role.getValue() === RoleEnum.VENDOR) {
                const { vendor } = await this.createVendorUseCase.execute({
                    id: user.id.getValue(),
                    firstName,
                    lastName,
                    city,
                    phone,
                    photo,
                });
                await this.vendorRepository.create(vendor, ctx);
            }
        });

        return { accessToken };
    }
}
