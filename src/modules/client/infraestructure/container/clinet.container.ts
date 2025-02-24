import { IClientRepository } from "@Client/application/repositories/client.repository";
import { Container } from "inversify";
import { CLIENT_SYMBOLS } from "./client.symbols";
import { ClientPrismaRepository } from "../persistence/client-prisma.repository";
import { ICreateClientUseCase } from "@Client/application/use-cases/create-client/create-client.use-case";
import { CreateClientUseCase } from "@Client/application/use-cases/create-client/create-client.impl";
import { ClientController } from "@Client/presentation/client.controller";

export const clientContainer = new Container();

clientContainer.bind<IClientRepository>(CLIENT_SYMBOLS.ClientRepository).to(ClientPrismaRepository);
clientContainer.bind<ICreateClientUseCase>(CLIENT_SYMBOLS.CreateClientUseCase).to(CreateClientUseCase);
clientContainer.bind<ClientController>(ClientController).toSelf();
