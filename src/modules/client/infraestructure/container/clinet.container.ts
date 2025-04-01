import { Container } from "inversify";
import { CLIENT_SYMBOLS } from "./client.symbols";
import { CreateClientUseCase } from "@Client/application/use-cases/create-client/create-client.impl";
import { ClientController } from "@Client/presentation/client.controller";
import { registerUseCases, registerControllers } from "@Common/utils/container-utils";

export function createClientContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    registerUseCases(container, [{ symbol: CLIENT_SYMBOLS.CreateClient, implementation: CreateClientUseCase }]);
    registerControllers(container, [ClientController]);

    return container;
}
