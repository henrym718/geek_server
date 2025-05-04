import { IdVO, TextVO, UrlVO } from "@Core/value-objects";

interface VendorProfileProps {
    id: IdVO;
    title: TextVO;
    aboutme: TextVO;
    bannerImage: UrlVO;
    isActive: boolean;
    skills: IdVO[];
    createdAt?: Date;
    updatedAt?: Date;
    vendorId: IdVO;
    categoryId: IdVO;
}

export class VendorProfile {
    private constructor(private readonly props: VendorProfileProps) {}

    public static create(props: Omit<VendorProfileProps, "isActive" | "createdAt" | "updatedAt">): VendorProfile {
        return new VendorProfile({ ...props, isActive: true });
    }

    public static reconstitute(props: VendorProfileProps): VendorProfile {
        return new VendorProfile({ ...props });
    }

    public get id(): IdVO {
        return this.props.id;
    }

    public get title(): TextVO {
        return this.props.title;
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

    public get bannerImage(): UrlVO {
        return this.props.bannerImage;
    }
}
