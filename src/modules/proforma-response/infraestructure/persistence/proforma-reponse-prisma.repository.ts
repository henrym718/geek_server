import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { ProformaResponse } from "@Core/entities/proforma-response";
import {
    IProformaResponseRepository,
    ProformaResponseWithVendor,
} from "modules/proforma-response/application/repositories/proforma-response.repository";
import { ProformaResponseMapper } from "./proforma-reponse.mapper";
import { VendorMapper } from "@Vendor/infraestructure/persistence/vendor.mapper";
import { VendorProfileMapper } from "@VendorProfile/infraestructure/persistence/vendor-profile.mapper";

export class ProformaResponsePrismaRepository implements IProformaResponseRepository {
    private get db() {
        return PrismaBootstrap.prisma;
    }

    async create(data: ProformaResponse): Promise<void> {
        await this.db.proformaResponse.create({ data: ProformaResponseMapper.toPersistence(data) });
    }

    async update(entity: ProformaResponse): Promise<void> {
        await this.db.proformaResponse.update({
            where: { id: entity.id.getValue() },
            data: ProformaResponseMapper.toPersistence(entity),
        });
    }

    async updateMany(proformaResponses: ProformaResponse[]): Promise<void> {
        await this.db.$transaction(
            proformaResponses.map((item) =>
                this.db.proformaResponse.update({
                    where: { id: item.id.getValue() },
                    data: ProformaResponseMapper.toPersistence(item),
                })
            )
        );
    }

    async findById(id: string): Promise<ProformaResponse | null> {
        const responses = await this.db.proformaResponse.findUnique({ where: { id } });
        return responses ? ProformaResponseMapper.toDomain(responses) : null;
    }

    async findByRequestIdAndProfileVendorId(requestId: string, profileVendorId: string): Promise<ProformaResponse | null> {
        const response = await this.db.proformaResponse.findUnique({
            where: {
                proformaRequestId_profileVendorId: {
                    proformaRequestId: requestId,
                    profileVendorId: profileVendorId,
                },
            },
        });

        return response ? ProformaResponseMapper.toDomain(response) : null;
    }

    findAll(): Promise<ProformaResponse[]> {
        throw new Error("Method not implemented.");
    }

    async findAllByRequestId(requestId: string): Promise<ProformaResponseWithVendor[]> {
        const reponses = await this.db.proformaResponse.findMany({
            where: { proformaRequestId: requestId },
            include: { vendorProfile: { include: { vendor: true } } },
        });

        return reponses.map((reponse) => ({
            proformaResponse: ProformaResponseMapper.toDomain(reponse),
            vendor: VendorMapper.toDomain(reponse.vendorProfile.vendor),
            vendorProfile: VendorProfileMapper.toDomain(reponse.vendorProfile),
        }));
    }

    async findByProformaRequestIdAndProfileVendorId(proformaRequestId: string, profileVendorId: string): Promise<boolean> {
        const response = await this.db.proformaResponse.findUnique({
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
