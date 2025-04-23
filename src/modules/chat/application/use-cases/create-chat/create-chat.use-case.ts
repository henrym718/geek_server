import { CreateChatRequest, CreateChatResponse } from "./create-chat.dto";

export interface ICreateChatUseCase {
    execute(request: CreateChatRequest): Promise<CreateChatResponse>;
}
