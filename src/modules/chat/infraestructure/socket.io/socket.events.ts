import { Socket, Server } from "socket.io";

export const handleJoinChat = (io: Server) => {
    if (!io) return;
    io.on("connection", (socket: Socket) => {
        console.log("🟢 New client connected: ", socket.id);

        socket.on("joinChat", (chatId: string) => {
            socket.join(chatId);
            console.log("🟢 Joined chat: ", chatId);
        });

        socket.on("leaveChat", (chatId: string) => {
            socket.leave(chatId);
            console.log("🔴 Left chat: ", chatId);
        });

        socket.on("sendMessage", (data: { chatId: string; message: string; senderId: string; receiverId: string }) => {
            io.to(data.chatId).emit("newMessage", data.message);
            console.log("🟢 Message sent: ", data);
        });

        socket.on("disconnect", () => {
            console.log("🔴 Disconnected: ", socket.id);
        });
    });
};
