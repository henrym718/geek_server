import { HttpException } from "@Common/exceptions/http.exception";
import { BudgetUnitVO, IdVO, PriceVO, ProjectLengthVO, ProjectTypeVO, ProjectWorkloadVO, StatusRequestVO, TextVO } from "@Core/value-objects";
import { StatusRequestEnum } from "@Core/value-objects/status-request.vo";

interface ProformaRequestProps {
    id: IdVO;
    title: TextVO;
    description: TextVO;
    budget?: PriceVO;
    budgetUnit?: BudgetUnitVO;
    quotation?: boolean;
    scope: IdVO;
    projectType: ProjectTypeVO;
    projectLength: ProjectLengthVO;
    projectWorkload: ProjectWorkloadVO;
    status: StatusRequestVO;
    createdAt?: Date;
    updatedAt?: Date;
    countResponses: number;
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

    public annulled(): ProformaRequest {
        if (this.props.status.equals(StatusRequestVO.fromEnum(StatusRequestEnum.ANNULLED))) {
            throw HttpException.forbidden("La ProformaRequest ya está cancelada.");
        }
        return new ProformaRequest({
            ...this.props,
            status: StatusRequestVO.fromEnum(StatusRequestEnum.ANNULLED),
        });
    }

    public finished(): ProformaRequest {
        if (this.props.status.equals(StatusRequestVO.fromEnum(StatusRequestEnum.FINISHED))) {
            throw HttpException.forbidden("La ProformaRequest ya está finalizada.");
        }
        return new ProformaRequest({
            ...this.props,
            status: StatusRequestVO.fromEnum(StatusRequestEnum.FINISHED),
        });
    }

    public matched(): ProformaRequest {
        if (this.props.status.equals(StatusRequestVO.fromEnum(StatusRequestEnum.MATCHED))) {
            throw HttpException.forbidden("La ProformaRequest ya está aceptada.");
        }
        return new ProformaRequest({
            ...this.props,
            status: StatusRequestVO.fromEnum(StatusRequestEnum.MATCHED),
        });
    }

    public incrementCountResponses(): ProformaRequest {
        return new ProformaRequest({
            ...this.props,
            countResponses: this.props.countResponses + 1,
        });
    }

    public get id(): IdVO {
        return this.props.id;
    }

    public get description(): TextVO {
        return this.props.description;
    }

    public get budget(): PriceVO | undefined {
        return this.props.budget;
    }

    public get status(): StatusRequestVO {
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

    public get scope(): IdVO {
        return this.props.scope;
    }

    public get projectType(): ProjectTypeVO {
        return this.props.projectType;
    }

    public get projectLength(): ProjectLengthVO {
        return this.props.projectLength;
    }

    public get projectWorkload(): ProjectWorkloadVO {
        return this.props.projectWorkload;
    }

    public get quotation(): boolean | undefined {
        return this.props.quotation;
    }

    public get budgetUnit(): BudgetUnitVO | undefined {
        return this.props.budgetUnit;
    }

    public get countResponses(): number {
        return this.props.countResponses;
    }
}
