import { HttpException } from "@Common/exceptions/http.exception";
import { IdVO, PriceVO, StatusVO, TextVO } from "@Core/value-objects";
import { StatusEnum } from "@Core/value-objects/status.vo";

interface ProformaRequestProps {
    id: IdVO;
    title: TextVO;
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

    public canceled(): ProformaRequest {
        if (this.props.status.equals(StatusVO.fromEnum(StatusEnum.CANCELED))) {
            throw HttpException.forbidden("La ProformaRequest ya está cancelada.");
        }
        return new ProformaRequest({
            ...this.props,
            status: StatusVO.fromEnum(StatusEnum.CANCELED),
        });
    }

    public finished(): ProformaRequest {
        if (this.props.status.equals(StatusVO.fromEnum(StatusEnum.FINISHED))) {
            throw HttpException.forbidden("La ProformaRequest ya está finalizada.");
        }
        return new ProformaRequest({
            ...this.props,
            status: StatusVO.fromEnum(StatusEnum.FINISHED),
        });
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

    public get title(): TextVO {
        return this.props.title;
    }
}
