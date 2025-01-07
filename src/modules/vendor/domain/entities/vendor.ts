export class Vendor {
    private constructor(private readonly props: VendorProps) {}

    static create(props: Omit<VendorProps, "id">): Vendor {
        return new Vendor({
            ...props,
            id: "id",
        });
    }

    static reconstitute(props: VendorProps): Vendor {
        return new Vendor(props);
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
