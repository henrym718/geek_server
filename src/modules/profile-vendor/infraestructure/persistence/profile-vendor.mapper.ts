import { ProfileVendor } from "@Core/entities/profile-vendor";
import { IdVO, TextVO } from "@Core/value-objects";
import { Prisma, ProfileVendor as PrismaProfileVendor } from "@prisma/client";

export class ProfileVendorMapper {
    public static toPersistence(profileVendor: ProfileVendor): Prisma.ProfileVendorCreateInput {
        return {
            id: profileVendor.id.getValue(),
            tittle: profileVendor.title.getValue(),
            aboutme: profileVendor.aboutme.getValue(),
            isActive: profileVendor.isActive,
            vendor: { connect: { id: profileVendor.vendorId.getValue() } },
            category: { connect: { id: profileVendor.categoryId.getValue() } },
            skill: { connect: profileVendor.skills.map((skillId) => ({ id: skillId.getValue() })) },
        };
    }
    public static toDomain(profilevendor: PrismaProfileVendor): ProfileVendor {
        return ProfileVendor.reconstitute({
            id: IdVO.create(profilevendor.id),
            aboutme: TextVO.create("aboutme", profilevendor.aboutme),
            tittle: TextVO.create("tittle", profilevendor.tittle),
            skills: [],
            isActive: profilevendor.isActive,
            categoryId: IdVO.create(profilevendor.categoryId),
            vendorId: IdVO.create(profilevendor.vendorId),
        });
    }
}
