import { IdVO, PriceVO, StatusVO, TextVO } from "@Core/value-objects";

interface ProformaRequestProps {
    id: IdVO;
    description: TextVO;
    budget: PriceVO;
    status: StatusVO;
    createdAt?: Date;
    updatedAt?: Date;
    clientId: IdVO;
    categoryId: IdVO;
    skills: IdVO[];
}

export class ProformaRequest {
    private constructor(private readonly props: ProformaRequestProps) {}

    public static create(props: Omit<ProformaRequestProps, "createdAt" | "updatedAt">): ProformaRequest {
        return new ProformaRequest(props);
    }

    public static reconstitute(props: ProformaRequestProps): ProformaRequest {
        return new ProformaRequest(props);
    }

    public get id(): IdVO {
        return this.props.id;
    }

    public get description(): TextVO {
        return this.props.description;
    }

    public get budget(): PriceVO {
        return this.props.budget;
    }

    public get status(): StatusVO {
        return this.props.status;
    }

    public get createdAt(): Date | undefined {
        return this.props.createdAt;
    }

    public get updatedAt(): Date | undefined {
        return this.props.updatedAt;
    }

    public get clientId(): IdVO {
        return this.props.clientId;
    }

    public get categoryId(): IdVO {
        return this.props.categoryId;
    }

    public get skills(): IdVO[] {
        return this.props.skills;
    }
}
