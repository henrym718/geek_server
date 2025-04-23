import { Chat } from "@Core/entities/chat";
import { IdVO } from "@Core/value-objects";
import { Chat as ChatPrisma } from "@prisma/client";

export class ChatMapper {
    public static toPersistence(chat: Chat): ChatPrisma {
        return {
            id: chat.id.getValue(),
            clientId: chat.clientId.getValue(),
            vendorId: chat.vendorId.getValue(),
            createdAt: chat.createdAt,
        };
    }

    public static toDomain(chat: ChatPrisma): Chat {
        return Chat.reconstitute({
            id: IdVO.create(chat.id),
            clientId: IdVO.create(chat.clientId),
            vendorId: IdVO.create(chat.vendorId),
            createdAt: chat.createdAt,
        });
    }
}
