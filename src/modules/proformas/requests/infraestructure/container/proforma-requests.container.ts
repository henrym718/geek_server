import { Container } from "inversify";
import { ProformaRequestsController } from "modules/proformas/requests/presnetation/proforma-requests.controller";
import { CreateProformaRequestsUseCase } from "modules/proformas/requests/application/use-cases/create-proforma-request/create-proforma-requests.impl";
import { GetProformaRequestByClientIdUseCase } from "modules/proformas/requests/application/use-cases/get-proforma-requests-by-clientid/get-proforma-requests-by-clientid.impl";
import { CanceledProformaRequestUseCase } from "modules/proformas/requests/application/use-cases/canceled-proforma-request/canceled-proforma-request.impl";
import { GetProformaRequestsByVendorProfileUseCase } from "modules/proformas/requests/application/use-cases/get-proforma-requests-by-vendor-profile/get-proforma-requests-by-vendor-profile.impl";

import { PROFORMA_REQ_SYMBOLS } from "./proforma-requests.symbols";
import { registerUseCases, registerControllers } from "@Common/utils/container-utils";
import { GetProformaRequestBySkillUseCase } from "modules/proformas/requests/application/use-cases/get-proforma-request-by-skill/get-proforma-request-by-skill.impl";

export function configureProformaRequestsContainer(rootContainer: Container) {
    registerUseCases(rootContainer, [
        { symbol: PROFORMA_REQ_SYMBOLS.CanceledProformaRequestUseCase, implementation: CanceledProformaRequestUseCase },
        { symbol: PROFORMA_REQ_SYMBOLS.CreateProformaRequestsUseCase, implementation: CreateProformaRequestsUseCase },
        { symbol: PROFORMA_REQ_SYMBOLS.GetProformaRequestsByClientUseCase, implementation: GetProformaRequestByClientIdUseCase },
        { symbol: PROFORMA_REQ_SYMBOLS.GetProformaRequestsByVendorProfile, implementation: GetProformaRequestsByVendorProfileUseCase },
        { symbol: PROFORMA_REQ_SYMBOLS.GetProformaRequestBySkillUseCase, implementation: GetProformaRequestBySkillUseCase },
    ]);

    registerControllers(rootContainer, [ProformaRequestsController]);
}
