import { IdVO, TextVO } from "@Core/value-objects";
import { User } from "./user";

export interface ClientProps {
    readonly id: IdVO;
    readonly firstName: TextVO;
    readonly lastName: TextVO;
    readonly photo?: TextVO;
    readonly city: TextVO;
    readonly userId: IdVO;
}

export class Client {
    private constructor(private readonly props: ClientProps) {}

    static create(props: ClientProps): Client {
        return new Client(props);
    }

    static reconstitute(props: ClientProps): Client {
        return new Client(props);
    }

    get id(): IdVO {
        return this.props.id;
    }

    get firstName(): TextVO {
        return this.props.firstName;
    }

    get lastName(): TextVO {
        return this.props.lastName;
    }

    get photo(): TextVO | null {
        return this.props.photo ?? null;
    }

    get city(): TextVO {
        return this.props.city;
    }

    get userId(): IdVO {
        return this.userId;
    }
}
