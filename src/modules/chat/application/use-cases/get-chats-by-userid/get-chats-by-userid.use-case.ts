import { GetChatsByUserIdRequest, GetChatsByUserIdResponse } from "./get-chats-by-userid.dto";

export interface IGetChatsByUserIdUseCase {
    execute(request: GetChatsByUserIdRequest): Promise<GetChatsByUserIdResponse[]>;
}
