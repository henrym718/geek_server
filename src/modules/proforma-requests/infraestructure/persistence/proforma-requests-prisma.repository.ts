import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { ProformaRequest } from "@Core/entities/proforma-requests";
import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { ProformaRequestsMapper } from "./proforma-requests.mapper";

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
        const proformaRequest = await this.db.findUnique({ where: { id } });
        return proformaRequest ? ProformaRequestsMapper.toDomain(proformaRequest) : null;
    }

    findAll(): Promise<ProformaRequest[]> {
        throw new Error("Method not implemented.");
    }
}
