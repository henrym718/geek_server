import { IdVO, TextVO } from "@Core/value-objects";

export interface CategoryProps {
    id: IdVO;
    name: TextVO;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    groupId: IdVO;
}

export class Category {
    private constructor(private readonly props: CategoryProps) {}

    public static create(data: Pick<CategoryProps, "id" | "name" | "groupId">): Category {
        return new Category({
            ...data,
            isActive: true,
            createdAt: new Date(),
            updatedAt: null,
        });
    }

    public static reconstitute(data: CategoryProps): Category {
        return new Category(data);
    }

    get id(): IdVO {
        return this.props.id;
    }

    get name(): TextVO {
        return this.props.name;
    }

    get isActive(): boolean {
        return this.props.isActive;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date | null {
        return this.props.updatedAt;
    }

    get groupId(): IdVO {
        return this.props.groupId;
    }
}
