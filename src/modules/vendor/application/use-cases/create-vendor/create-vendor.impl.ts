import { IVendorRepository } from "../../repositories/vendor.repository";
import { ICreateVendorUseCase } from "./create-vendor.use-case";
import { ReqCreateVendorDto, ResCreateVendorDto } from "./create-vendor.dto";
import { IdVO, TextVO, UrlVO } from "@Core/value-objects";
import { PhoneVO } from "@Core/value-objects/phone.vo";
import { Vendor } from "@Core/entities/vendor";
import { HttpException } from "@Common/exceptions/http.exception";
import { User } from "@Core/entities/user";
import { inject, injectable } from "inversify";
import { VENDOR_SYMBOLS } from "@Vendor/infraestructure/container/vendor.symbol";

@injectable()
export class CreateVendorUseCase implements ICreateVendorUseCase {
    constructor(@inject(VENDOR_SYMBOLS.VendorRepository) private readonly vendorRepository: IVendorRepository) {}

    async execute(data: ReqCreateVendorDto): Promise<ResCreateVendorDto> {
        const existingvendor = await this.vendorRepository.findById(data.id);
        if (existingvendor) throw HttpException.badRequest("Vendor has been created");

        const newVendor = this.createVendorEntity(data);
        await this.vendorRepository.create(newVendor);
        const vendorCreated = await this.vendorRepository.findVendorByidWithUser(newVendor.id.getValue());
        if (!vendorCreated) throw HttpException.notFound("Vendor not found");
        return this.mapToResponse(vendorCreated);
    }

    private createVendorEntity(data: ReqCreateVendorDto): Vendor {
        const { id, firstName, lastName, city, phone, photo } = data;

        return Vendor.create({
            id: IdVO.create(id),
            firstName: TextVO.create("firstName", firstName),
            lastName: TextVO.create("lastName", lastName),
            city: TextVO.create("city", city),
            phone: PhoneVO.create(phone),
            photo: UrlVO.create(photo, "s3"),
        });
    }

    private mapToResponse({ user, vendor }: { user: User; vendor: Vendor }): ResCreateVendorDto {
        return {
            id: user.id.getValue(),
            email: user.email.getValue(),
            role: user.role.getValue(),
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            profileCompleted: !!vendor,
            vendorProfile: {
                firstName: vendor.firstName.getValue(),
                lastName: vendor.lastName.getValue(),
                city: vendor.city.getValue(),
                phone: vendor.phone.getValue(),
                photo: vendor.photo?.getValue() ?? null,
            },
        };
    }
}
