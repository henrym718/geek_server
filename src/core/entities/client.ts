import { IdVO, TextVO, UrlVO } from "@Core/value-objects";

export interface ClientProps {
    readonly id: IdVO;
    readonly firstName: TextVO;
    readonly lastName: TextVO;
    readonly photo: UrlVO | null;
    readonly city: TextVO;
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

    get photo(): UrlVO | null {
        return this.props.photo ?? null;
    }

    get city(): TextVO {
        return this.props.city;
    }
}
