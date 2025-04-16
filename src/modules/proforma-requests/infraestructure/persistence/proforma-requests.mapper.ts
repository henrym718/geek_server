import { ProformaRequest } from "@Core/entities/proforma-requests";
import { BudgetUnitVO, IdVO, PriceVO, ProjectLengthVO, ProjectTypeVO, ProjectWorkloadVO, StatusVO, TextVO } from "@Core/value-objects";
import { Prisma, ProformaRequest as PrismaProformaRequest } from "@prisma/client";

export class ProformaRequestsMapper {
    public static toPersistence(entity: ProformaRequest): Prisma.ProformaRequestCreateInput {
        return {
            id: entity.id.getValue(),
            title: entity.title.getValue(),
            description: entity.description.getValue(),
            budget: entity.budget.getValue(),
            budgetUnit: entity.budgetUnit.getValue(),
            quotation: entity.quotation,
            scope: entity.scope.getValue(),
            projectType: entity.projectType.getValue(),
            projectLength: entity.projectLength.getValue(),
            projectWorkload: entity.projectWorkload.getValue(),
            status: entity.status.getValue(),
            category: { connect: { id: entity.categoryId.getValue() } },
            client: { connect: { id: entity.clientId.getValue() } },
            skills: { connect: entity.skills.map((skillId) => ({ id: skillId.getValue() })) },
        };
    }

    public static toDomain(entity: PrismaProformaRequest): ProformaRequest {
        return ProformaRequest.reconstitute({
            id: IdVO.create(entity.id),
            title: TextVO.create("title", entity.title),
            description: TextVO.create("description", entity.description),
            budget: PriceVO.create(entity.budget),
            budgetUnit: BudgetUnitVO.fromPlainText(entity.budgetUnit),
            quotation: entity.quotation,
            scope: TextVO.create("scope", entity.scope),
            projectType: ProjectTypeVO.fromPlainText(entity.projectType),
            projectLength: ProjectLengthVO.fromPlainText(entity.projectLength),
            projectWorkload: ProjectWorkloadVO.fromPlainText(entity.projectWorkload),
            status: StatusVO.fromPlainText(entity.status),
            categoryId: IdVO.create(entity.categoryId),
            clientId: IdVO.create(entity.clientId),
            skills: [],
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
}
