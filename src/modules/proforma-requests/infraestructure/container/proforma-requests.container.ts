import { Container } from "inversify";
import { PROFORMA_REQ_SYMBOLS } from "./proforma-requests.symbols";
import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { ProformaRequestsPrismaRepository } from "../persistence/proforma-requests-prisma.repository";
import { ProformaRequestsController } from "@ProformaRequests/presnetation/proforma-requests.controller";
import { ICreateProformaRequestsUseCase } from "@ProformaRequests/application/use-cases/create-proforma-requests/create-proforma-requests.use-case";
import { CreateProformaRequestsUseCase } from "@ProformaRequests/application/use-cases/create-proforma-requests/create-proforma-requests.impl";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { UUIDServiceImpl } from "@Shared/services/uuid/uuid.service.impl";
import { CATEGORY_SYMBOLS } from "@Category/infraestructure/container/category.symbol";
import { CategoryPrismaRepository } from "@Category/infraestructure/persistence/category-prisma.repository";
import { ICategoryRepository } from "@Category/application/interfaces/repositories/category.repository";
import { SKILL_SYMBOLS } from "@Skill/infraestructure/container/skill.symbols";
import { SkillPrismaRepository } from "@Skill/infraestructure/persistence/skill-prisma.repository";
import { ISkillRepository } from "@Skill/application/repositories/skill.repository";
import { CLIENT_SYMBOLS } from "@Client/infraestructure/container/client.symbols";
import { IClientRepository } from "@Client/application/repositories/client.repository";
import { ClientPrismaRepository } from "@Client/infraestructure/persistence/client-prisma.repository";

export const proformaRequestsContainer = new Container();

proformaRequestsContainer.bind<IProformaRequestsRepository>(PROFORMA_REQ_SYMBOLS.ProformaRequestsRepository).to(ProformaRequestsPrismaRepository);
proformaRequestsContainer.bind<ICreateProformaRequestsUseCase>(PROFORMA_REQ_SYMBOLS.CreateProformaRequestsUseCase).to(CreateProformaRequestsUseCase);
proformaRequestsContainer.bind<IUUIDService>(SHARED_SYMBOLS.UUIDService).to(UUIDServiceImpl);
proformaRequestsContainer.bind<ICategoryRepository>(CATEGORY_SYMBOLS.CategoryRepository).to(CategoryPrismaRepository);
proformaRequestsContainer.bind<ISkillRepository>(SKILL_SYMBOLS.SkillRepository).to(SkillPrismaRepository);
proformaRequestsContainer.bind<IClientRepository>(CLIENT_SYMBOLS.ClientRepository).to(ClientPrismaRepository);

proformaRequestsContainer.bind<ProformaRequestsController>(ProformaRequestsController).toSelf();
