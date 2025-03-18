import { Router } from "express";
import { skillContainer } from "../infraestructure/container/skill.container";
import { SkillController } from "./skill.controller";

export const skillRoutes = Router();
const skillController = skillContainer.get(SkillController);

skillRoutes.post("/", skillController.createSkill);
