import { Container } from "inversify";
import { ProformaRequestsPrismaRepository } from "../persistence/proforma-requests-prisma.repository";
import { ProformaRequestsController } from "@ProformaRequests/presnetation/proforma-requests.controller";

// Casos de uso
import { ICreateProformaRequestsUseCase } from "@ProformaRequests/application/use-cases/create-proforma-request/create-proforma-requests.use-case";
import { CreateProformaRequestsUseCase } from "@ProformaRequests/application/use-cases/create-proforma-request/create-proforma-requests.impl";
import { IGetProformaRequestsByClientUseCase } from "@ProformaRequests/application/use-cases/get-proforma-requests-by-clientid/get-proforma-requests-by-clientid.use-case";
import { GetProformaRequestByClientIdUseCase } from "@ProformaRequests/application/use-cases/get-proforma-requests-by-clientid/get-proforma-requests-by-clientid.impl";
import { ICanceledProformaRequestUseCase } from "@ProformaRequests/application/use-cases/canceled-proforma-request/canceled-proforma-request.use-case";
import { CanceledProformaRequestUseCase } from "@ProformaRequests/application/use-cases/canceled-proforma-request/canceled-proforma-request.impl";
import { IGetProformaRequestsByVendorProfileUseCase } from "@ProformaRequests/application/use-cases/get-proforma-requests-by-vendor-profile/get-proforma-requests-by-vendor-profile.use-case";
import { GetProformaRequestsByVendorProfileUseCase } from "@ProformaRequests/application/use-cases/get-proforma-requests-by-vendor-profile/get-proforma-requests-by-vendor-profile.impl";

// Repositorios
import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { IProformaResponseRepository } from "modules/proforma-response/application/repositories/proforma-response.repository";
import { ProformaResponsePrismaRepository } from "modules/proforma-response/infraestructure/persistence/proforma-reponse-prisma.repository";
import { ICategoryRepository } from "@Category/application/interfaces/repositories/category.repository";
import { CategoryPrismaRepository } from "@Category/infraestructure/persistence/category-prisma.repository";
import { IClientRepository } from "@Client/application/repositories/client.repository";
import { ClientPrismaRepository } from "@Client/infraestructure/persistence/client-prisma.repository";
import { ISkillRepository } from "@Skill/application/repositories/skill.repository";
import { SkillPrismaRepository } from "@Skill/infraestructure/persistence/skill-prisma.repository";
import { PROFORMA_RES_SYMBOLS } from "modules/proforma-response/infraestructure/container/proforma-reponse.symbols";
import { CATEGORY_SYMBOLS } from "@Category/infraestructure/container/category.symbol";
import { CLIENT_SYMBOLS } from "@Client/infraestructure/container/client.symbols";
import { SKILL_SYMBOLS } from "@Skill/infraestructure/container/skill.symbols";
import { PROFORMA_REQ_SYMBOLS } from "./proforma-requests.symbols";

// Servicios compartidos
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { UUIDServiceImpl } from "@Shared/services/uuid/uuid.service.impl";
import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";
import { VENDOR_PROFILE_SYMBOLS } from "@VendorProfile/infraestructure/container/vendor-profile.symbols";
import { VendorProfilePrismaRepository } from "@VendorProfile/infraestructure/persistence/vendor-profile-prisma.repository";

export const proformaRequestsContainer = new Container();

// Repositorios
proformaRequestsContainer.bind<IProformaRequestsRepository>(PROFORMA_REQ_SYMBOLS.ProformaRequestsRepository).to(ProformaRequestsPrismaRepository);
proformaRequestsContainer.bind<IProformaResponseRepository>(PROFORMA_RES_SYMBOLS.ProformaResponseRepository).to(ProformaResponsePrismaRepository);
proformaRequestsContainer.bind<ICategoryRepository>(CATEGORY_SYMBOLS.CategoryRepository).to(CategoryPrismaRepository);
proformaRequestsContainer.bind<IClientRepository>(CLIENT_SYMBOLS.ClientRepository).to(ClientPrismaRepository);
proformaRequestsContainer.bind<ISkillRepository>(SKILL_SYMBOLS.SkillRepository).to(SkillPrismaRepository);
proformaRequestsContainer.bind<IVendorProfilesRepository>(VENDOR_PROFILE_SYMBOLS.VendorProfileRepository).to(VendorProfilePrismaRepository);

// Servicios compartidos
proformaRequestsContainer.bind<IUUIDService>(SHARED_SYMBOLS.UUIDService).to(UUIDServiceImpl);

// Casos de usos
proformaRequestsContainer.bind<ICanceledProformaRequestUseCase>(PROFORMA_REQ_SYMBOLS.CanceledProformaRequestUseCase).to(CanceledProformaRequestUseCase); // prettier-ignore
proformaRequestsContainer.bind<ICreateProformaRequestsUseCase>(PROFORMA_REQ_SYMBOLS.CreateProformaRequestsUseCase).to(CreateProformaRequestsUseCase); // prettier-ignore
proformaRequestsContainer.bind<IGetProformaRequestsByClientUseCase>(PROFORMA_REQ_SYMBOLS.GetProformaRequestsByClientUseCase).to(GetProformaRequestByClientIdUseCase); // prettier-ignore
proformaRequestsContainer.bind<IGetProformaRequestsByVendorProfileUseCase>(PROFORMA_REQ_SYMBOLS.GetProformaRequestsByVendorProfile).to(GetProformaRequestsByVendorProfileUseCase); // prettier-ignore

// Controladores
proformaRequestsContainer.bind<ProformaRequestsController>(ProformaRequestsController).toSelf();
