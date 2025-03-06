import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { ProformaResponse } from "@Core/entities/proforma-response";
import { IProformaResponseRepository } from "modules/proforma-response/application/repositories/proforma-response.repository";
import { ProformaReponseMapper } from "./proforma-reponse.mapper";

export class ProformaResponsePrismaRepository implements IProformaResponseRepository {
    private get db() {
        return PrismaBootstrap.prisma.proformaResponse;
    }

    async create(data: ProformaResponse): Promise<void> {
        console.log("vendor", data.profileVendorId);
        console.log("proforma-response", data.proformaRequestId);

        await this.db.create({ data: ProformaReponseMapper.toPersistence(data) });
    }

    update(entity: ProformaResponse): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findById(id: string): Promise<ProformaResponse | null> {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<ProformaResponse[]> {
        throw new Error("Method not implemented.");
    }

    async findByProformaRequestIdAndProfileVendorId(proformaRequestId: string, profileVendorId: string): Promise<boolean> {
        const response = await this.db.findUnique({
            where: {
                proformaRequestId_profileVendorId: {
                    proformaRequestId: proformaRequestId,
                    profileVendorId: profileVendorId,
                },
            },
        });
        return !!response;
    }
}
