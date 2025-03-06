import { Container } from "inversify";
import { PROFORMA_RES_SYMBOLS } from "./proforma-reponse.symbols";
import { IProformaResponseRepository } from "modules/proforma-response/application/repositories/proforma-response.repository";
import { ProformaResponsePrismaRepository } from "../persistence/proforma-reponse-prisma.repository";
import { ICreateProformaResponseUseCase } from "modules/proforma-response/application/use-cases/create/create-proforma-response.use-case";
import { CreateProformaResponseUseCase } from "modules/proforma-response/application/use-cases/create/create-proforma-response.impl";
import { ProformaReponseController } from "modules/proforma-response/presentation/proforma-reponse.controller";
import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { PROFORMA_REQ_SYMBOLS } from "@ProformaRequests/infraestructure/container/proforma-requests.symbols";
import { ProformaRequestsPrismaRepository } from "@ProformaRequests/infraestructure/persistence/proforma-requests-prisma.repository";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";
import { UUIDServiceImpl } from "@Shared/services/uuid/uuid.service.impl";
import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";
import { VendorProfilePrismaRepository } from "@VendorProfile/infraestructure/persistence/vendor-profile-prisma.repository";
import { VENDOR_PROFILE_SYMBOLS } from "@VendorProfile/infraestructure/container/vendor-profile.symbols";

export const proformaResponseContainer = new Container();

proformaResponseContainer.bind<IProformaResponseRepository>(PROFORMA_RES_SYMBOLS.ProformaResponseRepository).to(ProformaResponsePrismaRepository);
proformaResponseContainer.bind<ICreateProformaResponseUseCase>(PROFORMA_RES_SYMBOLS.CreateProformaResponseUseCase).to(CreateProformaResponseUseCase);
proformaResponseContainer.bind<IVendorProfilesRepository>(VENDOR_PROFILE_SYMBOLS.VendorProfileRepository).to(VendorProfilePrismaRepository);
proformaResponseContainer.bind<IProformaRequestsRepository>(PROFORMA_REQ_SYMBOLS.ProformaRequestsRepository).to(ProformaRequestsPrismaRepository);
proformaResponseContainer.bind<IUUIDService>(SHARED_SYMBOLS.UUIDService).to(UUIDServiceImpl);
proformaResponseContainer.bind<ProformaReponseController>(ProformaReponseController).toSelf();
