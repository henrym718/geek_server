import { ProformaRequest } from "@Core/entities/proforma-requests";
import { IdVO, PriceVO, StatusVO, TextVO } from "@Core/value-objects";
import { Prisma, ProformaRequest as PrismaProformaRequest } from "@prisma/client";

export class ProformaRequestsMapper {
    public static toPersistence(entity: ProformaRequest): Prisma.ProformaRequestCreateInput {
        return {
            id: entity.id.getValue(),
            description: entity.description.getValue(),
            budget: entity.budget.getValue(),
            status: entity.status.getValue(),
            category: { connect: { id: entity.categoryId.getValue() } },
            client: { connect: { id: entity.clientId.getValue() } },
            skills: {
                create: entity.skills.map((skillId) => ({
                    skill: { connect: { id: skillId.getValue() } },
                })),
            },
        };
    }

    public static toDomain(entity: PrismaProformaRequest): ProformaRequest {
        return ProformaRequest.reconstitute({
            id: IdVO.create(entity.id),
            description: TextVO.create("description", entity.description),
            budget: PriceVO.create(entity.budget),
            status: StatusVO.fromPlainText(entity.status),
            categoryId: IdVO.create(entity.categoryId),
            clientId: IdVO.create(entity.clientId),
            skills: [],
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
}
