import { Skill } from "@Core/entities/skill";
import { IdVO, TextVO } from "@Core/value-objects";
import { Prisma, Skill as prismaSkill } from "@prisma/client";

export class SkillMapper {
    public static toPersistence(skill: Skill): Prisma.SkillCreateInput {
        return {
            id: skill.id.getValue(),
            name: skill.name.getValue(),
            category: { connect: { id: skill.categoryId.getValue() } },
        };
    }
    public static toDomain(skill: prismaSkill): Skill {
        return Skill.reconstitute({
            id: IdVO.create(skill.id),
            name: TextVO.create("name", skill.name),
            categoryId: IdVO.create(skill.categoryId),
        });
    }
}
