import { inject, injectable } from "inversify";
import { CHAT_SYMBOLS } from "../infraestructure/container/chat.symbols";
import { ICreateChatUseCase } from "../application/use-cases/create-chat/create-chat.use-case";
import { NextFunction, Request, Response } from "express";
import { CreateChatRequest } from "../application/use-cases/create-chat/create-chat.dto";
import { HttpResponse } from "@Common/response/http.response";
import { GetChatsByUserIdRequest } from "../application/use-cases/get-chats-by-userid/get-chats-by-userid.dto";
import { IGetChatsByUserIdUseCase } from "../application/use-cases/get-chats-by-userid/get-chats-by-userid.use-case";

@injectable()
export class ChatController {
    constructor(
        @inject(CHAT_SYMBOLS.CreateChat)
        private readonly createChatUseCase: ICreateChatUseCase,

        @inject(CHAT_SYMBOLS.GetChatsByUserId)
        private readonly getChatsByUserIdUseCase: IGetChatsByUserIdUseCase
    ) {
        this.createChat = this.createChat.bind(this);
        this.getChatsByUserId = this.getChatsByUserId.bind(this);
    }

    async createChat(req: Request, res: Response, next: NextFunction) {
        try {
            const data: CreateChatRequest = req.body;
            const chat = await this.createChatUseCase.execute(data);
            HttpResponse.success(res, chat);
        } catch (error) {
            next(error);
        }
    }

    async getChatsByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const data: GetChatsByUserIdRequest = { userId: req.params.userId };
            const chats = await this.getChatsByUserIdUseCase.execute(data);
            HttpResponse.success(res, chats);
        } catch (error) {
            next(error);
        }
    }
}
