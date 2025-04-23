import { IdVO, TextVO } from "@Core/value-objects";

interface MessageProps {
    id: IdVO;
    message: TextVO;
    chatId: IdVO;
    senderId: IdVO;
    createdAt: Date;
}

export class Message {
    private constructor(private readonly props: MessageProps) {}

    public static create(props: Omit<MessageProps, "createdAt">): Message {
        return new Message({ ...props, createdAt: new Date() });
    }

    public static reconstitute(props: MessageProps): Message {
        return new Message(props);
    }

    public get id(): IdVO {
        return this.props.id;
    }

    public get message(): TextVO {
        return this.props.message;
    }

    public get chatId(): IdVO {
        return this.props.chatId;
    }

    public get senderId(): IdVO {
        return this.props.senderId;
    }

    public get createdAt(): Date {
        return this.props.createdAt;
    }
}
