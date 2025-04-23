import { inject, injectable } from "inversify";
import { CHAT_SYMBOLS } from "../infraestructure/container/chat.symbols";
import { ICreateChatUseCase } from "../application/use-cases/create-chat/create-chat.use-case";
import { NextFunction, Request, Response } from "express";
import { CreateChatRequest } from "../application/use-cases/create-chat/create-chat.dto";
import { HttpResponse } from "@Common/response/http.response";

@injectable()
export class ChatController {
    constructor(
        @inject(CHAT_SYMBOLS.CreateChat)
        private readonly createChatUseCase: ICreateChatUseCase
    ) {
        this.createChat = this.createChat.bind(this);
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
}
