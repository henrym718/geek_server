import { VendorProfile } from "@Core/entities/profile-vendor";
import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";
import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { VendorProfileMapper } from "./vendor-profile.mapper";
import { Vendor } from "@Core/entities/vendor";
import { Skill } from "@Core/entities/skill";
import { SearchRequest } from "@VendorProfile/aplication/use-cases/search-vendor-profiles/search-vendor-profiles.dto";
import { SkillMapper } from "@Skill/infraestructure/persistence/skill.mapper";
import { VendorMapper } from "@Vendor/infraestructure/persistence/vendor.mapper";

export class VendorProfilePrismaRepository implements IVendorProfilesRepository {
    get db() {
        return PrismaBootstrap.prisma;
    }

    async create(entity: VendorProfile): Promise<void> {
        await this.db.vendorProfile.create({ data: VendorProfileMapper.toPersistence(entity) });
    }

    update(entity: VendorProfile): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<VendorProfile | null> {
        const response = await this.db.vendorProfile.findUnique({ where: { id } });
        return response ? VendorProfileMapper.toDomain(response) : null;
    }

    async findByIdWithSkillsId(id: string): Promise<VendorProfile | null> {
        const response = await this.db.vendorProfile.findUnique({ where: { id }, include: { skills: true } });
        return response ? VendorProfileMapper.toDomain(response, response.skills) : null;
    }

    async searchVendorProfiles(
        filter: Required<SearchRequest>
    ): Promise<{ vendorProfiles: Array<{ vendorProfile: VendorProfile; vendor: Vendor; skills: Skill[] }>; results: number }> {
        const { order, city, skills, page, query, categoryName, limit } = filter;
        const take = limit;
        const skip = (page - 1) * take;

        const whereCondition = {
            OR: [
                { tittle: { contains: query, mode: "insensitive" as const } },
                { skills: { some: { name: { contains: query, mode: "insensitive" as const } } } },
            ],
            category: { name: { contains: categoryName, mode: "insensitive" as const } },
            vendor: { city: { contains: city, mode: "insensitive" as const } },
            AND: skills?.split(",").map((skill) => ({ skills: { some: { name: skill } } })),
            isActive: true,
        };

        const [profiles, results] = await this.db.$transaction([
            this.db.vendorProfile.findMany({
                where: whereCondition,
                orderBy: { createdAt: order },
                take,
                skip,
                include: { skills: true, vendor: true, category: true },
            }),

            this.db.vendorProfile.count({
                where: whereCondition,
            }),
        ]);

        const vendorProfiles = profiles.map(({ vendor, skills, ...vendorProfile }) => ({
            vendorProfile: VendorProfileMapper.toDomain(vendorProfile),
            vendor: VendorMapper.toDomain(vendor),
            skills: skills.map((skill) => SkillMapper.toDomain(skill)),
        }));

        return { vendorProfiles, results };
    }

    findAll(): Promise<VendorProfile[]> {
        throw new Error("Method not implemented.");
    }
}
