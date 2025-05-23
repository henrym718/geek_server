import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { ReqCreateProformaRequestDto, ResCreateProformaRequestDto } from "./create-proforma-requests.dto";
import { ICreateProformaRequestsUseCase } from "./create-proforma-requests.use-case";
import { ProformaRequest } from "@Core/entities/proforma-requests";
import { BudgetUnitVO, IdVO, PriceVO, ProjectLengthVO, ProjectTypeVO, ProjectWorkloadVO, StatusRequestVO, TextVO } from "@Core/value-objects";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { StatusRequestEnum } from "@Core/value-objects/status-request.vo";
import { inject, injectable } from "inversify";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { ICategoryRepository } from "@Category/application/repositories/category.repository";
import { ISkillRepository } from "@Skill/application/repositories/skill.repository";
import { IClientRepository } from "@Client/application/repositories/client.repository";
import { HttpException } from "@Common/exceptions/http.exception";

@injectable()
export class CreateProformaRequestsUseCase implements ICreateProformaRequestsUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.ProformaRequestRepository) private readonly proformaRequestsRepository: IProformaRequestsRepository,
        @inject(SHARED_SYMBOLS.UUIDService) private readonly idService: IUUIDService,
        @inject(SHARED_SYMBOLS.CategoryRepository) private readonly categoryRepository: ICategoryRepository,
        @inject(SHARED_SYMBOLS.SkillRepository) private readonly skillRepository: ISkillRepository,
        @inject(SHARED_SYMBOLS.ClientRepository) private readonly clientRepository: IClientRepository
    ) {}

    async execute(data: ReqCreateProformaRequestDto): Promise<ResCreateProformaRequestDto> {
        const { clientId, categoryId, budget, description, skills, title, city, budgetUnit, projectLength, projectType, projectWorkload, quotation } =
            data;

        console.log(city);

        const proformaRequestiD = IdVO.create(this.idService.generateUUID());
        const proformaRequestTitle = TextVO.create("Title", title);
        const proformaRequestCity = IdVO.create(city);
        const proformaRequestBudget = budget ? PriceVO.create(budget) : undefined;
        const proformaRequestBudgetUnit = budgetUnit ? BudgetUnitVO.fromPlainText(budgetUnit) : undefined;
        const proformaRequestQuotation = quotation;
        const proformaRequestProjectType = ProjectTypeVO.fromPlainText(projectType);
        const proformaRequestProjectLength = ProjectLengthVO.fromPlainText(projectLength);
        const proformaRequestProjectWorkload = ProjectWorkloadVO.fromPlainText(projectWorkload);
        const proformaRequestDescription = TextVO.create("Deescption", description);
        const proformaRequestSttaus = StatusRequestVO.fromEnum(StatusRequestEnum.ACTIVE);
        const proformaRequestSkills = skills.map((skill) => IdVO.create(skill));
        const client_Id = IdVO.create(clientId);
        const category_Id = IdVO.create(categoryId);

        const [clientFound, categoryFound, skillFound, areSkillsValid] = await Promise.all([
            this.clientRepository.findById(client_Id.getValue()),
            this.categoryRepository.findById(category_Id.getValue()),
            this.skillRepository.findByIds(proformaRequestSkills.map((skill) => skill.getValue())),
            this.skillRepository.areSkillsValidForCategory(categoryId, skills),
        ]);

        if (!clientFound) throw HttpException.badRequest("Cient not found");
        if (!categoryFound) throw HttpException.badRequest("Category not found");
        if (skillFound.length !== proformaRequestSkills.length) throw HttpException.badRequest("Some skills were not found");
        if (!areSkillsValid) throw HttpException.badRequest("Some skills do not belong to the specified category");

        const newProformaRequest = ProformaRequest.create({
            id: proformaRequestiD,
            budget: proformaRequestBudget,
            description: proformaRequestDescription,
            status: proformaRequestSttaus,
            clientId: client_Id,
            categoryId: category_Id,
            skills: proformaRequestSkills,
            title: proformaRequestTitle,
            city: proformaRequestCity,
            budgetUnit: proformaRequestBudgetUnit,
            quotation: proformaRequestQuotation,
            projectType: proformaRequestProjectType,
            projectLength: proformaRequestProjectLength,
            projectWorkload: proformaRequestProjectWorkload,
            countResponses: 0,
        });

        await this.proformaRequestsRepository.create(newProformaRequest);

        return { detail: "Proforma Request Created" };
    }
}
