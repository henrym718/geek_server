import { User } from "@Domain/entities/user";

export class Vendor {
    private constructor(private readonly user: User, private readonly props: VendorProps) {}

    static create(user: User, props: Omit<VendorProps, "id">): Vendor {
        return new Vendor(user, { ...props, id: "id" });
    }

    static reconstitute(user: User, props: VendorProps): Vendor {
        return new Vendor(user, props);
    }
}

export interface VendorProps {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly photo: string;
    readonly phone: string;
    readonly city: string;
    readonly userId: string;
}
