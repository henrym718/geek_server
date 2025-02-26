import { IdVO, TextVO } from "@Core/value-objects";

interface SkillProps {
    id: IdVO;
    name: TextVO;
    categoryId: IdVO;
}

export class Skill {
    private constructor(private readonly props: SkillProps) {}

    public static create(props: SkillProps): Skill {
        return new Skill(props);
    }

    public static reconstitute(props: SkillProps): Skill {
        return new Skill(props);
    }

    get id(): IdVO {
        return this.props.id;
    }

    get name(): TextVO {
        return this.props.name;
    }
}
