import { IdVO } from "@Core/value-objects";

export interface ChatProps {
    id: IdVO;
    clientId: IdVO;
    vendorId: IdVO;
    createdAt: Date;
}

export class Chat {
    private constructor(private readonly props: ChatProps) {}

    public static create(props: Omit<ChatProps, "createdAt">): Chat {
        return new Chat({ ...props, createdAt: new Date() });
    }

    public static reconstitute(props: ChatProps): Chat {
        return new Chat(props);
    }

    public get id(): IdVO {
        return this.props.id;
    }

    public get clientId(): IdVO {
        return this.props.clientId;
    }

    public get vendorId(): IdVO {
        return this.props.vendorId;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }
}
