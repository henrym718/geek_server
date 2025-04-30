import { VendorProfile } from "@Core/entities/profile-vendor";
import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";
import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { VendorProfileMapper } from "./vendor-profile.mapper";
import { Vendor } from "@Core/entities/vendor";
import { Skill } from "@Core/entities/skill";
import { SearchRequest } from "@VendorProfile/aplication/use-cases/search-vendor-profiles/search-vendor-profiles.dto";
import { SkillMapper } from "@Skill/infraestructure/persistence/skill.mapper";
import { VendorMapper } from "@Vendor/infraestructure/persistence/vendor.mapper";
import { Category } from "@Core/entities/category";
import { CategoryMapper } from "@Category/infraestructure/persistence/category.mapper";

export class VendorProfilePrismaRepository implements IVendorProfilesRepository {
    // Obtiene la instancia de prisma
    get db() {
        return PrismaBootstrap.prisma;
    }

    // Crea un nuevo perfil de vendedor
    async create(entity: VendorProfile): Promise<void> {
        await this.db.vendorProfile.create({ data: VendorProfileMapper.toPersistence(entity) });
    }

    update(entity: VendorProfile): Promise<void> {
        throw new Error("Method not implemented.");
    }

    // Busca un perfil por ID
    async findById(id: string): Promise<VendorProfile | null> {
        const response = await this.db.vendorProfile.findUnique({ where: { id } });
        return response ? VendorProfileMapper.toDomain(response) : null;
    }

    // Busca perfiles por ID del vendedor incluyendo skills y categoría
    async findByVendorId(vendorId: string): Promise<{ vendorProfile: VendorProfile; skills: Skill[]; category: Category }[] | null> {
        const response = await this.db.vendorProfile.findMany({ where: { vendorId }, include: { skills: true, category: true } });

        if (!response) return null;

        return response.map(({ skills, category, ...vendorProfile }) => ({
            vendorProfile: VendorProfileMapper.toDomain(vendorProfile),
            category: CategoryMapper.toDomain(category),
            skills: skills.map((skill) => SkillMapper.toDomain(skill)),
        }));
    }

    // Busca un perfil por ID incluyendo sus skills
    async findByIdWithSkillsId(id: string): Promise<VendorProfile | null> {
        const response = await this.db.vendorProfile.findUnique({ where: { id }, include: { skills: true } });
        return response ? VendorProfileMapper.toDomain(response, response.skills) : null;
    }

    // Busca perfiles con filtros y paginación
    async searchVendorProfiles(
        filter: Required<SearchRequest>
    ): Promise<{ data: Array<{ vendorProfile: VendorProfile; vendor: Vendor }>; results: number }> {
        const { order, city, skills, page, query, categoryId, limit } = filter;
        const take = limit;
        const skip = (page - 1) * take;

        // Separa los nombres de skills por comas
        const skillNames = skills?.split(",").map((s) => s.trim()) || [];

        const where = {
            ...(skillNames.length > 0 && {
                skills: {
                    some: {
                        name: { in: skillNames, mode: "insensitive" as const },
                    },
                },
            }),
            ...(query && {
                title: {
                    contains: query,
                    mode: "insensitive" as const,
                },
            }),
            ...(city && {
                vendor: {
                    city: {
                        contains: city,
                        mode: "insensitive" as const,
                    },
                },
            }),
            ...(categoryId && {
                categoryId,
            }),
            isActive: true,
        };

        // Ejecuta la búsqueda y el conteo en una transacción
        const [profiles, results] = await this.db.$transaction([
            this.db.vendorProfile.findMany({
                where,
                orderBy: {
                    createdAt: order,
                },
                take,
                skip,
                include: {
                    vendor: true,
                    category: true,
                },
            }),

            this.db.vendorProfile.count({ where }),
        ]);

        // Mapea los resultados al dominio
        const data = profiles.map(({ vendor, ...vendorProfile }) => ({
            vendorProfile: VendorProfileMapper.toDomain(vendorProfile),
            vendor: VendorMapper.toDomain(vendor),
        }));

        return { data, results };
    }

    findAll(): Promise<VendorProfile[]> {
        throw new Error("Method not implemented.");
    }
}
