import { IdVO, TextVO } from "../value-objects";

interface GroupProps {
    id: IdVO;
    name: TextVO;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}

export class Group {
    private constructor(private readonly props: GroupProps) {}

    public static create(data: { id: IdVO; name: TextVO }): Group {
        const now = new Date();
        return new Group({ ...data, isActive: true, createdAt: now, updatedAt: null });
    }

    public static reconstitute(data: GroupProps): Group {
        return new Group(data);
    }

    public update(data: { name: TextVO }): Group {
        return new Group({ ...this.props, ...data, updatedAt: new Date() });
    }

    public desactivate(): Group {
        return new Group({ ...this.props, isActive: false, updatedAt: new Date() });
    }
}
