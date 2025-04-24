import { Chat } from "@Core/entities/chat";
import { User } from "@Core/entities/user";

export interface IChatRepository {
    create(chat: Chat): Promise<Chat>;
    findById(id: string): Promise<Chat | null>;
    findAllByUser(clientId: string): Promise<{ chat: Chat; client: User; vendor: User }[]>;
    findByUsers(clientId: string, vendorId: string): Promise<Chat | null>;
}
