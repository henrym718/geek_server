import { ContainerBootstrap, IDENTIFIERS } from "@Bootstraps/container.bootstrap";
import { Router } from "express";
import { ChatController } from "./chat.controller";
import { authenticate } from "@Common/middlewares/authenticate";
import { checkRoles } from "@Common/middlewares/checkRoles";
import { RoleEnum } from "@Core/value-objects";

export function configurecHATRoutes(): Router {
    const router = Router();

    const chatContainer = ContainerBootstrap.getModuleContainer(IDENTIFIERS.Chat);
    const chatController = chatContainer.get(ChatController);

    router.post("/", authenticate, checkRoles(RoleEnum.CLIENT, RoleEnum.VENDOR), chatController.createChat);
    router.get("/", authenticate, checkRoles(RoleEnum.CLIENT, RoleEnum.VENDOR), chatController.getChatsByUserId);

    return router;
}
