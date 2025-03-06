import { IdVO, PriceVO, StatusVO, TextVO } from "@Core/value-objects";

interface ProformaResponseProps {
    id: IdVO;
    budget: PriceVO;
    message: TextVO;
    status: StatusVO;
    createdAt?: Date;
    updatedAt?: Date;
    proformaRequestId: IdVO;
    profileVendorId: IdVO;
}

export class ProformaResponse {
    private constructor(private readonly props: ProformaResponseProps) {}

    public static create(props: Omit<ProformaResponseProps, "createdAt" | "updatedAt">): ProformaResponse {
        return new ProformaResponse(props);
    }
    public static reconstitute(props: ProformaResponseProps): ProformaResponse {
        return new ProformaResponse(props);
    }

    public get id(): IdVO {
        return this.props.id;
    }

    public get message(): TextVO {
        return this.props.message;
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

    public get proformaRequestId(): IdVO {
        return this.props.proformaRequestId;
    }

    public get profileVendorId(): IdVO {
        return this.props.profileVendorId;
    }
}
