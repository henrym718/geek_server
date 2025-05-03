import { Vendor } from "@Core/entities/vendor";
import { IdVO, TextVO, UrlVO } from "@Core/value-objects";
import { PhoneVO } from "@Core/value-objects/phone.vo";
import { Prisma, Vendor as VendorPrisma } from "@prisma/client";

export class VendorMapper {
    public static toPersistece(vendor: Vendor): Prisma.VendorUncheckedCreateInput {
        return {
            id: vendor.id.getValue(),
            firstName: vendor.firstName.getValue(),
            lastName: vendor.lastName.getValue(),
            photo: vendor.photo?.getValue() ?? null,
            phone: vendor.phone.getValue(),
            cityId: vendor.city.getValue(),
        };
    }

    public static toDomain(vendor: VendorPrisma): Vendor {
        return Vendor.reconstitute({
            id: IdVO.create(vendor.id),
            firstName: TextVO.create("firstName", vendor.firstName),
            lastName: TextVO.create("lastName", vendor.lastName),
            photo: vendor.photo ? UrlVO.create(vendor.photo, "s3") : null,
            phone: PhoneVO.create(vendor.phone),
            city: IdVO.create(vendor.cityId),
        });
    }
}
