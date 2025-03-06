import { VendorProfile } from "@Core/entities/profile-vendor";
import { IdVO, TextVO } from "@Core/value-objects";
import { Prisma, VendorProfile as PrismaProfileVendor } from "@prisma/client";

export class VendorProfileMapper {
    public static toPersistence(entity: VendorProfile): Prisma.VendorProfileCreateInput {
        return {
            id: entity.id.getValue(),
            tittle: entity.title.getValue(),
            aboutme: entity.aboutme.getValue(),
            isActive: entity.isActive,
            vendor: { connect: { id: entity.vendorId.getValue() } },
            category: { connect: { id: entity.categoryId.getValue() } },
            skills: {
                create: entity.skills.map((skillId) => ({
                    skill: { connect: { id: skillId.getValue() } },
                })),
            },
        };
    }
    public static toDomain(entity: PrismaProfileVendor): VendorProfile {
        return VendorProfile.reconstitute({
            id: IdVO.create(entity.id),
            aboutme: TextVO.create("aboutme", entity.aboutme),
            tittle: TextVO.create("tittle", entity.tittle),
            skills: [],
            isActive: entity.isActive,
            categoryId: IdVO.create(entity.categoryId),
            vendorId: IdVO.create(entity.vendorId),
        });
    }
}
