import { Container } from "inversify";
import { CreateChatUseCase } from "modules/chat/application/use-cases/create-chat/create-chat.impl";
import { CHAT_SYMBOLS } from "./chat.symbols";
import { registerControllers, registerUseCases } from "@Common/utils/container-utils";
import { ChatController } from "modules/chat/presentation/chat.controller";
import { GetChatsByUserIdUseCase } from "modules/chat/application/use-cases/get-chats-by-userid/get-chats-by-userid.impl";

export function createChatContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    registerUseCases(container, [
        { symbol: CHAT_SYMBOLS.CreateChat, implementation: CreateChatUseCase },
        { symbol: CHAT_SYMBOLS.GetChatsByUserId, implementation: GetChatsByUserIdUseCase },
    ]);

    registerControllers(container, [ChatController]);

    return container;
}
