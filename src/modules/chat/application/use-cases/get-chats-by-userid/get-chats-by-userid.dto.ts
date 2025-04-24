import { Chat, User } from "@Common/dtos/global.dtos";

export interface GetChatsByUserIdRequest {
    userId: string;
}

export interface GetChatsByUserIdResponse {
    chats: Pick<Chat, "id">;
    client: Pick<User, "id" | "username">;
    vendor: Pick<User, "id" | "username">;
}
