import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { Chat } from "@Core/entities/chat";
import { IChatRepository } from "modules/chat/application/repositories/chat.repository";
import { ChatMapper } from "./chat.mapper";
import { User } from "@Core/entities/user";
import { UserMapper } from "@User/infrastructure/persistence/user.mapper";

export class ChatPrismaRepository implements IChatRepository {
    private get prisma() {
        return PrismaBootstrap.prisma;
    }

    async create(chat: Chat): Promise<Chat> {
        const createdChat = await this.prisma.chat.create({
            data: ChatMapper.toPersistence(chat),
        });
        return ChatMapper.toDomain(createdChat);
    }

    async findById(id: string): Promise<Chat | null> {
        const chat = await this.prisma.chat.findUnique({
            where: { id },
        });
        return chat ? ChatMapper.toDomain(chat) : null;
    }

    async findAllByUser(userId: string): Promise<{ chat: Chat; client: User; vendor: User }[]> {
        const chats = await this.prisma.chat.findMany({
            where: {
                OR: [{ clientId: userId }, { vendorId: userId }],
            },
            include: {
                client: true,
                vendor: true,
            },
        });
        return chats.map((chat) => ({
            chat: ChatMapper.toDomain(chat),
            client: UserMapper.toDomain(chat.client),
            vendor: UserMapper.toDomain(chat.vendor),
        }));
    }

    async findByUsers(clientId: string, vendorId: string): Promise<Chat | null> {
        const chat = await this.prisma.chat.findUnique({
            where: {
                clientId_vendorId: {
                    clientId,
                    vendorId,
                },
            },
        });
        return chat ? ChatMapper.toDomain(chat) : null;
    }
}
