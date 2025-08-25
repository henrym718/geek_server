import { Container } from "inversify";
import { PROFORMA_RES_SYMBOLS } from "./proforma-reponse.symbols";
import { CreateProformaResponseUseCase } from "modules/proformas/response/application/use-cases/create-proforma-response/create-proforma-response.impl";
import { ProformaReponseController } from "modules/proformas/response/presentation/proforma-reponse.controller";
import { GetProformaResponsesByRequestIdUseCase } from "modules/proformas/response/application/use-cases/get-proforma-responses-by-proforma-request-Id/get-proforma-responses-by-proforma-request-id.impl.";
import { UpdateProformaResponseStatusByClientUseCase } from "modules/proformas/response/application/use-cases/update-proforma-response-status-by-client/update-proforma-response-status-by-client.imple";
import { registerUseCases, registerControllers } from "@Common/utils/container-utils";
import { CheckProformaReaponseExistsUseCase } from "modules/proformas/response/application/use-cases/chek-proforma-response-exists/chek-proforma-response-exists.impl";

export function configureProformaResponseContainer(rootContainer: Container) {
    registerUseCases(rootContainer, [
        { symbol: PROFORMA_RES_SYMBOLS.CreateProformaResponse, implementation: CreateProformaResponseUseCase },
        { symbol: PROFORMA_RES_SYMBOLS.UpdateProformaResponseStatusByClient, implementation: UpdateProformaResponseStatusByClientUseCase },
        { symbol: PROFORMA_RES_SYMBOLS.GetproformaResponsesByRequestId, implementation: GetProformaResponsesByRequestIdUseCase },
        { symbol: PROFORMA_RES_SYMBOLS.CheckProformaResponseExists, implementation: CheckProformaReaponseExistsUseCase },
    ]);

    registerControllers(rootContainer, [ProformaReponseController]);
}
