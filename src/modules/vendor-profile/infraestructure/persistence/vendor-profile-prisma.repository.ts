import { VendorProfile } from "@Core/entities/profile-vendor";
import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";
import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { VendorProfileMapper } from "./vendor-profile.mapper";

export class VendorProfilePrismaRepository implements IVendorProfilesRepository {
    get db() {
        return PrismaBootstrap.prisma.vendorProfile;
    }

    async create(entity: VendorProfile): Promise<void> {
        await this.db.create({ data: VendorProfileMapper.toPersistence(entity) });
    }

    update(entity: VendorProfile): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<VendorProfile | null> {
        const response = await this.db.findUnique({ where: { id } });
        return response ? VendorProfileMapper.toDomain(response) : null;
    }

    findAll(): Promise<VendorProfile[]> {
        throw new Error("Method not implemented.");
    }
}
