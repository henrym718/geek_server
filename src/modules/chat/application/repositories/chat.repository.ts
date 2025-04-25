import { Chat } from "@Core/entities/chat";
import { Client } from "@Core/entities/client";
import { User } from "@Core/entities/user";
import { Vendor } from "@Core/entities/vendor";

export interface IChatRepository {
    create(chat: Chat): Promise<Chat>;
    findById(id: string): Promise<Chat | null>;
    findAllByUser(clientId: string): Promise<{ chat: Chat; client: User; vendor: User; clientProfile: Client; vendorProfile: Vendor }[]>;
    findByUsers(clientId: string, vendorId: string): Promise<Chat | null>;
}
