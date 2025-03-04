import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { ProformaRequest } from "@Core/entities/proforma-requests";
import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { ProformaRequestsMapper } from "./proforma-requests.mapper";

export class ProformaRequestsPrismaRepository implements IProformaRequestsRepository {
    private get prisma() {
        return PrismaBootstrap.prisma;
    }

    async create(data: ProformaRequest): Promise<void> {
        await this.prisma.proformaRequest.create({
            data: ProformaRequestsMapper.toPersistence(data),
        });
    }

    update(entity: ProformaRequest): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findById(id: string): Promise<ProformaRequest | null> {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<ProformaRequest[]> {
        throw new Error("Method not implemented.");
    }
}
