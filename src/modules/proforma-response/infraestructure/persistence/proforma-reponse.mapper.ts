import { ProformaResponse } from "@Core/entities/proforma-response";
import { IdVO, PriceVO, StatusResponseVO, TextVO } from "@Core/value-objects";
import { Prisma, ProformaResponse as PrismaProformaResponse } from "@prisma/client";

export class ProformaResponseMapper {
    public static toPersistence(entity: ProformaResponse): Prisma.ProformaResponseCreateInput {
        return {
            id: entity.id.getValue(),
            budget: entity.budget ? entity.budget.getValue() : undefined,
            message: entity.message.getValue(),
            status: entity.status.getValue(),
            vendorProfile: { connect: { id: entity.profileVendorId.getValue() } },
            proformaRequest: { connect: { id: entity.proformaRequestId.getValue() } },
        };
    }

    public static toDomain(entity: PrismaProformaResponse): ProformaResponse {
        return ProformaResponse.reconstitute({
            id: IdVO.create(entity.id),
            budget: entity.budget ? PriceVO.create(entity.budget) : undefined,
            message: TextVO.create("message", entity.message),
            status: StatusResponseVO.fromPlainText(entity.status),
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            profileVendorId: IdVO.create(entity.profileVendorId),
            proformaRequestId: IdVO.create(entity.proformaRequestId),
        });
    }
}
