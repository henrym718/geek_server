import { VendorProfile } from "@Core/entities/profile-vendor";
import { IdVO, TextVO, UrlVO } from "@Core/value-objects";
import { Prisma, VendorProfile as PrismaProfileVendor } from "@prisma/client";

export class VendorProfileMapper {
    public static toPersistence(entity: VendorProfile): Prisma.VendorProfileCreateInput {
        return {
            id: entity.id.getValue(),
            title: entity.title.getValue(),
            aboutme: entity.aboutme.getValue(),
            bannerImage: entity.bannerImage.getValue(),
            isActive: entity.isActive,
            vendor: { connect: { id: entity.vendorId.getValue() } },
            category: { connect: { id: entity.categoryId.getValue() } },
            skills: { connect: entity.skills.map((skill) => ({ id: skill.getValue() })) },
        };
    }

    public static toDomain(entity: PrismaProfileVendor, skillsId?: { id: string }[]): VendorProfile {
        return VendorProfile.reconstitute({
            id: IdVO.create(entity.id),
            aboutme: TextVO.create("aboutme", entity.aboutme),
            title: TextVO.create("tittle", entity.title),
            skills: skillsId ? skillsId.map((skill) => IdVO.create(skill.id)) : [],
            bannerImage: UrlVO.create(entity.bannerImage, "standard"),
            isActive: entity.isActive,
            categoryId: IdVO.create(entity.categoryId),
            vendorId: IdVO.create(entity.vendorId),
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
}
