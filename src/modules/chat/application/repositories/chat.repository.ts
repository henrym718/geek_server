import { Chat } from "@Core/entities/chat";

export interface IChatRepository {
    create(chat: Chat): Promise<Chat>;
    findById(id: string): Promise<Chat | null>;
    findAllByUser(clientId: string): Promise<Chat[]>;
    findByUsers(clientId: string, vendorId: string): Promise<Chat | null>;
}
