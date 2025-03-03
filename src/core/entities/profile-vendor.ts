import { IdVO, TextVO } from "@Core/value-objects";

interface ProfileVendorProps {
    id: IdVO;
    tittle: TextVO;
    aboutme: TextVO;
    isActive: boolean;
    skills: IdVO[];
    createdAt?: Date;
    updatedAt?: Date;
    vendorId: IdVO;
    categoryId: IdVO;
}

export class ProfileVendor {
    private constructor(private readonly props: ProfileVendorProps) {}

    public static create(props: Omit<ProfileVendorProps, "isActive" | "createdAt" | "updatedAt">): ProfileVendor {
        return new ProfileVendor({ ...props, isActive: true });
    }

    public static reconstitute(props: ProfileVendorProps): ProfileVendor {
        return new ProfileVendor({ ...props });
    }

    public get id(): IdVO {
        return this.props.id;
    }

    public get title(): TextVO {
        return this.props.tittle;
    }

    public get aboutme(): TextVO {
        return this.props.aboutme;
    }

    public get isActive(): boolean {
        return this.props.isActive;
    }

    public get createdAt(): Date | undefined {
        return this.props.createdAt;
    }

    public get updatedAt(): Date | undefined {
        return this.props.updatedAt;
    }

    public get vendorId(): IdVO {
        return this.props.vendorId;
    }

    public get categoryId(): IdVO {
        return this.props.categoryId;
    }

    public get skills(): IdVO[] {
        return this.props.skills;
    }
}
