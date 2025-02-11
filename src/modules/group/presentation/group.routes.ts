import { Router } from "express";
import { groupContainer } from "@Group/infraestructure/container/group.container";
import { GroupController } from "./group.controller";

export const groupRoutes = Router();
const groupController = groupContainer.get(GroupController);

groupRoutes.post("/", groupController.createGroup);
