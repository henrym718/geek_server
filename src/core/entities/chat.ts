import { IdVO, TextVO } from "@Core/value-objects";

export interface ChatProps {
    id: IdVO;
    user1: TextVO;
    user2: TextVO;
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

    public get user1(): TextVO {
        return this.props.user1;
    }

    public get user2(): TextVO {
        return this.props.user2;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }
}
