import { PrismaClient } from "@prisma/client";
import { Socket, Server } from "socket.io";

export const handleJoinChat = (io: Server) => {
    io.on("connection", async (socket: Socket) => {
        const prisma = new PrismaClient();
        console.log("🟢 New client connected: ", socket.id);

        socket.on("joinRoom", (chatId: string) => {
            socket.join(chatId);
            console.log("🟢 Joined chat: ", chatId);
        });

        socket.on("sendMessage", async (data: { chatId: string; message: string; senderId: string }) => {
            const message = await prisma.message.create({
                data: {
                    message: data.message,
                    chatId: data.chatId,
                    senderId: data.senderId,
                },
            });

            io.to(data.chatId).emit("receiveMessage", [message]);
            console.log("🟢 Message sent: ", data);
        });

        socket.on("recoverMessages", async (chatId: string) => {
            const messages = await prisma.message.findMany({
                where: { chatId },
            });
            socket.emit("receiveMessage", messages);
        });

        socket.on("disconnect", () => {
            console.log("🔴 Disconnected: ", socket.id);
        });
    });
};
