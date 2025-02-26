import { Skill } from "@prisma/client";
import { IRepository } from "@Shared/repositories/repository";

export interface ISkillRepository extends IRepository<Skill> {}
