import { Router } from "express";
import { SkillController } from "./skill.controller";
import { ContainerBootstrap, IDENTIFIERS } from "@Bootstraps/container.bootstrap";

export function configureSkillRoutes(): Router {
    const skillRoutes = Router();
    const skillController = ContainerBootstrap.getModuleContainer(IDENTIFIERS.Skill).get(SkillController);

    skillRoutes.post("/", skillController.createSkill);

    return skillRoutes;
}
