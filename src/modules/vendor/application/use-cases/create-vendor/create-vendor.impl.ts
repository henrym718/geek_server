import { IVendorRepository } from "../../repositories/vendor.repository";
import { ICreateVendorUseCase } from "./create-vendor.use-case";
import { CreateVendorRequest, CreateVendorResponse } from "./create-vendor.dto";
import { IdVO, TextVO, UrlVO } from "@Core/value-objects";
import { PhoneVO } from "@Core/value-objects/phone.vo";
import { Vendor } from "@Core/entities/vendor";
import { HttpException } from "@Common/exceptions/http.exception";
import { inject, injectable } from "inversify";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";

@injectable()
export class CreateVendorUseCase implements ICreateVendorUseCase {
    constructor(@inject(SHARED_SYMBOLS.VendorRepository) private readonly vendorRepository: IVendorRepository) {}

    async execute(data: CreateVendorRequest): Promise<CreateVendorResponse> {
        const existingVendor = await this.vendorRepository.findById(data.id);
        if (existingVendor) throw HttpException.badRequest("Vendor has been created");

        const newVendor = Vendor.create({
            id: IdVO.create(data.id),
            firstName: TextVO.create("firstName", data.firstName),
            lastName: TextVO.create("lastName", data.lastName),
            city: TextVO.create("city", data.city),
            phone: PhoneVO.create(data.phone),
            photo: data.photo ? UrlVO.create(data.photo, "s3") : null,
        });

        return { vendor: newVendor };
    }
}
