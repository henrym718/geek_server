import { ProfileVendor } from "@Core/entities/profile-vendor";
import { IProfileVendorRepository } from "@ProfileVendor/aplication/repositories/profile-vendor.repository";
import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { ProfileVendorMapper } from "./profile-vendor.mapper";

export class ProfileVendorPrismaRepository implements IProfileVendorRepository {
    get prisma() {
        return PrismaBootstrap.prisma;
    }

    async create(entity: ProfileVendor): Promise<void> {
        await this.prisma.profileVendor.create({ data: ProfileVendorMapper.toPersistence(entity) });
    }

    update(entity: ProfileVendor): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findById(id: string): Promise<ProfileVendor | null> {
        throw new Error("Method not implemented id.");
    }

    findAll(): Promise<ProfileVendor[]> {
        throw new Error("Method not implemented.");
    }
}
