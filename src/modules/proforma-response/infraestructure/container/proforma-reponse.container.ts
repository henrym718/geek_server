import { Container } from "inversify";
import { PROFORMA_RES_SYMBOLS } from "./proforma-reponse.symbols";
import { CreateProformaResponseUseCase } from "modules/proforma-response/application/use-cases/create-proforma-response/create-proforma-response.impl";
import { ProformaReponseController } from "modules/proforma-response/presentation/proforma-reponse.controller";
import { GetProformaResponsesByRequestIdUseCase } from "modules/proforma-response/application/use-cases/get-proforma-responses-by-proforma-request-Id/get-proforma-responses-by-proforma-request-id.impl.";
import { UpdateProformaResponseStatusByClientUseCase } from "modules/proforma-response/application/use-cases/update-proforma-response-status-by-client/update-proforma-response-status-by-client.imple";
import { registerUseCases, registerControllers } from "@Common/utils/container-utils";

export function configureProformaResponseContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    registerUseCases(container, [
        { symbol: PROFORMA_RES_SYMBOLS.CreateProformaResponse, implementation: CreateProformaResponseUseCase },
        { symbol: PROFORMA_RES_SYMBOLS.UpdateProformaResponseStatusByClient, implementation: UpdateProformaResponseStatusByClientUseCase },
        { symbol: PROFORMA_RES_SYMBOLS.GetproformaResponsesByRequestId, implementation: GetProformaResponsesByRequestIdUseCase },
    ]);

    registerControllers(container, [ProformaReponseController]);

    return container;
}
