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
import { User } from "@Core/entities/user";
import { UserMapper } from "@User/infrastructure/persistence/user.mapper";
import { City } from "@Core/entities/city";
import { CityMapper } from "modules/city/infraestructure/persistense/city.mapper";

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

    async findById(id: string): Promise<VendorProfile | null> {
        const response = await this.db.vendorProfile.findUnique({ where: { id } });
        return response ? VendorProfileMapper.toDomain(response) : null;
    }

    async findByIdWithDetails(
        id: string
    ): Promise<{ user: User; vendor: Vendor; vendorProfile: VendorProfile; skills: Skill[]; category: Category; city: City } | null> {
        const response = await this.db.vendorProfile.findUnique({
            where: { id },
            include: {
                skills: true,
                category: true,
                vendor: {
                    include: {
                        user: true,
                        city: true,
                    },
                },
            },
        });

        if (!response) return null;

        return {
            user: UserMapper.toDomain(response.vendor.user),
            vendor: VendorMapper.toDomain(response.vendor),
            vendorProfile: VendorProfileMapper.toDomain(response),
            skills: response.skills.map((skill) => SkillMapper.toDomain(skill)),
            category: CategoryMapper.toDomain(response.category),
            city: CityMapper.toDomain(response.vendor.city),
        };
    }
    // Busca perfiles por ID del vendedor incluyendo skills y categoría
    async findByVendorId(vendorId: string): Promise<{ vendor: Vendor; vendorProfile: VendorProfile; city: City }[] | null> {
        const response = await this.db.vendorProfile.findMany({
            where: { vendorId },
            include: { vendor: { include: { city: true } } },
        });

        if (!response) return null;

        return response.map(({ vendor, ...vendorProfile }) => ({
            vendor: VendorMapper.toDomain(vendor),
            vendorProfile: VendorProfileMapper.toDomain(vendorProfile),
            city: CityMapper.toDomain(vendor.city),
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
    ): Promise<{ data: Array<{ vendorProfile: VendorProfile; vendor: Vendor; city: City }>; results: number }> {
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
                        id: city,
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
                    vendor: { include: { city: true } },
                    category: true,
                },
            }),

            this.db.vendorProfile.count({ where }),
        ]);

        // Mapea los resultados al dominio
        const data = profiles.map(({ vendor, ...vendorProfile }) => ({
            vendorProfile: VendorProfileMapper.toDomain(vendorProfile),
            vendor: VendorMapper.toDomain(vendor),
            city: CityMapper.toDomain(vendor.city),
        }));

        return { data, results };
    }

    findAll(): Promise<VendorProfile[]> {
        throw new Error("Method not implemented.");
    }
}
