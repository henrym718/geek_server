import { Container } from "inversify";
import { ProformaRequestsController } from "@ProformaRequests/presnetation/proforma-requests.controller";
import { CreateProformaRequestsUseCase } from "@ProformaRequests/application/use-cases/create-proforma-request/create-proforma-requests.impl";
import { GetProformaRequestByClientIdUseCase } from "@ProformaRequests/application/use-cases/get-proforma-requests-by-clientid/get-proforma-requests-by-clientid.impl";
import { CanceledProformaRequestUseCase } from "@ProformaRequests/application/use-cases/canceled-proforma-request/canceled-proforma-request.impl";
import { GetProformaRequestsByVendorProfileUseCase } from "@ProformaRequests/application/use-cases/get-proforma-requests-by-vendor-profile/get-proforma-requests-by-vendor-profile.impl";

import { PROFORMA_REQ_SYMBOLS } from "./proforma-requests.symbols";
import { registerUseCases, registerControllers } from "@Common/utils/container-utils";
import { GetProformaRequestBySkillUseCase } from "@ProformaRequests/application/use-cases/get-proforma-request-by-skill/get-proforma-request-by-skill.impl";

export function configureProformaRequestsContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    registerUseCases(container, [
        { symbol: PROFORMA_REQ_SYMBOLS.CanceledProformaRequestUseCase, implementation: CanceledProformaRequestUseCase },
        { symbol: PROFORMA_REQ_SYMBOLS.CreateProformaRequestsUseCase, implementation: CreateProformaRequestsUseCase },
        { symbol: PROFORMA_REQ_SYMBOLS.GetProformaRequestsByClientUseCase, implementation: GetProformaRequestByClientIdUseCase },
        { symbol: PROFORMA_REQ_SYMBOLS.GetProformaRequestsByVendorProfile, implementation: GetProformaRequestsByVendorProfileUseCase },
        { symbol: PROFORMA_REQ_SYMBOLS.GetProformaRequestBySkillUseCase, implementation: GetProformaRequestBySkillUseCase },
    ]);

    registerControllers(container, [ProformaRequestsController]);

    return container;
}
