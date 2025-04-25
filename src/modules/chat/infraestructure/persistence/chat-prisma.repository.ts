import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { Chat } from "@Core/entities/chat";
import { IChatRepository } from "modules/chat/application/repositories/chat.repository";
import { ChatMapper } from "./chat.mapper";
import { User } from "@Core/entities/user";
import { UserMapper } from "@User/infrastructure/persistence/user.mapper";
import { ClientMapper } from "@Client/infraestructure/persistence/client.mapper";
import { VendorMapper } from "@Vendor/infraestructure/persistence/vendor.mapper";
import { Client } from "@Core/entities/client";
import { Vendor } from "@Core/entities/vendor";

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

    async findAllByUser(userId: string): Promise<{ chat: Chat; client: User; vendor: User; clientProfile: Client; vendorProfile: Vendor }[]> {
        const chats = await this.prisma.chat.findMany({
            where: {
                OR: [{ clientId: userId }, { vendorId: userId }],
            },
            include: {
                client: { include: { client: true } },
                vendor: { include: { vendor: true } },
            },
        });
        return chats.map((chat) => ({
            chat: ChatMapper.toDomain(chat),
            client: UserMapper.toDomain(chat.client),
            vendor: UserMapper.toDomain(chat.vendor),
            clientProfile: ClientMapper.toDomain(chat.client.client!),
            vendorProfile: VendorMapper.toDomain(chat.vendor.vendor!),
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
