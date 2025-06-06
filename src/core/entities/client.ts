import { IdVO, TextVO, UrlVO } from "@Core/value-objects";
import { PhoneVO } from "@Core/value-objects/phone.vo";

export interface ClientProps {
    readonly id: IdVO;
    readonly firstName: TextVO;
    readonly lastName: TextVO;
    readonly photo: UrlVO | null;
    readonly phone: PhoneVO;
    readonly city: IdVO;
}

export class Client {
    private constructor(private readonly props: ClientProps) {}

    static create(props: ClientProps): Client {
        return new Client(props);
    }

    static reconstitute(props: ClientProps): Client {
        return new Client(props);
    }

    get fullName(): string {
        return this.props.firstName.getValue() + " " + this.props.lastName.getValue();
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

    get city(): IdVO {
        return this.props.city;
    }

    get phone(): PhoneVO {
        return this.props.phone;
    }
}
