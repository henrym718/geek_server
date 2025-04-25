import { IdVO, TextVO, UrlVO } from "@Core/value-objects";
import { PhoneVO } from "@Core/value-objects/phone.vo";

export interface VendorProps {
    readonly id: IdVO;
    readonly firstName: TextVO;
    readonly lastName: TextVO;
    readonly photo?: UrlVO | null;
    readonly phone: PhoneVO;
    readonly city: TextVO;
}
export class Vendor {
    private constructor(private readonly props: VendorProps) {}

    static create(props: VendorProps): Vendor {
        return new Vendor(props);
    }

    static reconstitute(props: VendorProps): Vendor {
        return new Vendor(props);
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

    get phone(): PhoneVO {
        return this.props.phone;
    }

    get photo(): UrlVO | null {
        return this.props.photo ?? null;
    }

    get city(): TextVO {
        return this.props.city;
    }
}
