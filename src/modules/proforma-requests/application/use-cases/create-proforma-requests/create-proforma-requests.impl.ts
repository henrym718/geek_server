import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { ReqCreateProformaRequestDto, ResCreateProformaRequestDto } from "./create-proforma-requests.dto";
import { ICreateProformaRequestsUseCase } from "./create-proforma-requests.use-case";
import { ProformaRequest } from "@Core/entities/proforma-requests";
import { IdVO, PriceVO, StatusVO, TextVO } from "@Core/value-objects";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { StatusEnum } from "@Core/value-objects/status.vo";
import { inject, injectable } from "inversify";
import { PROFORMA_REQ_SYMBOLS } from "@ProformaRequests/infraestructure/container/proforma-requests.symbols";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { ICategoryRepository } from "@Category/application/interfaces/repositories/category.repository";
import { CATEGORY_SYMBOLS } from "@Category/infraestructure/container/category.symbol";
import { SKILL_SYMBOLS } from "@Skill/infraestructure/container/skill.symbols";
import { ISkillRepository } from "@Skill/application/repositories/skill.repository";
import { CLIENT_SYMBOLS } from "@Client/infraestructure/container/client.symbols";
import { IClientRepository } from "@Client/application/repositories/client.repository";
import { HttpException } from "@Common/exceptions/http.exception";

@injectable()
export class CreateProformaRequestsUseCase implements ICreateProformaRequestsUseCase {
    constructor(
        @inject(PROFORMA_REQ_SYMBOLS.ProformaRequestsRepository) private readonly proformaRequestsRepository: IProformaRequestsRepository,
        @inject(SHARED_SYMBOLS.UUIDService) private readonly idService: IUUIDService,
        @inject(CATEGORY_SYMBOLS.CategoryRepository) private readonly categoryRepository: ICategoryRepository,
        @inject(SKILL_SYMBOLS.SkillRepository) private readonly skillRepository: ISkillRepository,
        @inject(CLIENT_SYMBOLS.ClientRepository) private readonly clientRepository: IClientRepository
    ) {}

    async execute(data: ReqCreateProformaRequestDto): Promise<ResCreateProformaRequestDto> {
        const { clientId, categoryId, budget, description, skills } = data;

        const proformaRequestiD = IdVO.create(this.idService.generateUUID());
        const proformaRequestBudget = PriceVO.create(budget);
        const proformaRequestDescription = TextVO.create("Deescption", description);
        const proformaRequestSttaus = StatusVO.fromEnum(StatusEnum.PENDING);
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
        });

        await this.proformaRequestsRepository.create(newProformaRequest);

        return { detail: "Proforma Request Created" };
    }
}
