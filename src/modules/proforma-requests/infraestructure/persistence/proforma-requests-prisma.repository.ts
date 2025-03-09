import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { ProformaRequest } from "@Core/entities/proforma-requests";
import { IProformaRequestsRepository, ProformaRequestWithRelations } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { ProformaRequestsMapper } from "./proforma-requests.mapper";
import { SkillMapper } from "@Skill/infraestructure/persistence/skill.mapper";
import { CategoryMapper } from "@Category/infraestructure/persistence/category.mapper";

export class ProformaRequestsPrismaRepository implements IProformaRequestsRepository {
    private get db() {
        return PrismaBootstrap.prisma.proformaRequest;
    }

    async create(data: ProformaRequest): Promise<void> {
        await this.db.create({
            data: ProformaRequestsMapper.toPersistence(data),
        });
    }

    update(entity: ProformaRequest): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<ProformaRequest | null> {
        const proformaRequest = await this.db.findUnique({
            where: { id },
            include: { skills: { select: { id: true } } },
        });
        return proformaRequest ? ProformaRequestsMapper.toDomain(proformaRequest) : null;
    }

    findAll(): Promise<ProformaRequest[]> {
        throw new Error("Method not implemented.");
    }

    async findAllByClientId(clientId: string): Promise<ProformaRequestWithRelations[]> {
        const proformaRequests = await this.db.findMany({
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
