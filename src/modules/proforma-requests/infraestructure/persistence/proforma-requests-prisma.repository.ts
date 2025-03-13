import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { ProformaRequest } from "@Core/entities/proforma-requests";
import { IProformaRequestsRepository, ProformaRequestWithRelations } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { ProformaRequestsMapper } from "./proforma-requests.mapper";
import { SkillMapper } from "@Skill/infraestructure/persistence/skill.mapper";
import { CategoryMapper } from "@Category/infraestructure/persistence/category.mapper";

export class ProformaRequestsPrismaRepository implements IProformaRequestsRepository {
    private get db() {
        return PrismaBootstrap.prisma;
    }

    async create(data: ProformaRequest): Promise<void> {
        await this.db.proformaRequest.create({
            data: ProformaRequestsMapper.toPersistence(data),
        });
    }

    async update(entity: ProformaRequest): Promise<void> {
        await this.db.proformaRequest.update({
            where: { id: entity.id.getValue() },
            data: ProformaRequestsMapper.toPersistence(entity),
        });
    }

    async findById(id: string): Promise<ProformaRequest | null> {
        const proformaRequest = await this.db.proformaRequest.findUnique({
            where: { id },
            include: { skills: { select: { id: true } } },
        });
        return proformaRequest ? ProformaRequestsMapper.toDomain(proformaRequest) : null;
    }

    async findByCategoryIdAndSkills(categoryId: string, skillIds: string[]): Promise<ProformaRequestWithRelations[]> {
        const requests = await this.db.proformaRequest.findMany({
            where: {
                AND: [
                    { categoryId },
                    { status: "ACTIVE" },

                    {
                        skills: { some: { id: { in: skillIds } } },
                    },
                ],
            },
            include: { skills: true, category: true },
        });

        return requests.map((item) => ({
            proformaRequest: ProformaRequestsMapper.toDomain(item),
            skills: item.skills.map((skill) => SkillMapper.toDomain(skill)),
            category: CategoryMapper.toDomain(item.category),
        }));
    }

    findAll(): Promise<ProformaRequest[]> {
        throw new Error("Method not implemented.");
    }

    async findAllByClientId(clientId: string): Promise<ProformaRequestWithRelations[]> {
        const proformaRequests = await this.db.proformaRequest.findMany({
            where: { clientId },
            include: { skills: true, category: true },
        });
        return proformaRequests.map((item) => ({
            proformaRequest: ProformaRequestsMapper.toDomain(item),
            skills: item.skills.map((s) => SkillMapper.toDomain(s)),
            category: CategoryMapper.toDomain(item.category),
        }));
    }
}
