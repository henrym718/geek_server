export class User {
    private constructor(private readonly props: UserProps) {}

    static create(props: Omit<UserProps, "id" | "createAt" | "isActive">): User {
        return new User({ ...props, id: "idprovisional", createdAt: new Date(), isActive: true });
    }

    static reconstitute(props: UserProps): User {
        return new User(props);
    }
}
// src/domain/entities/User.ts
export interface UserProps {
    readonly id: string;
    readonly email: string;
    readonly password: string | null;
    readonly provider: AuthProviderEnum;
    readonly role: RoleEnum;
    readonly isActive: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export enum AuthProviderEnum {
    LOCAL = "LOCAL",
    GOOGLE = "GOOGLE",
}

export enum RoleEnum {
    CLIENT = "CLIENT",
    VENDOR = "VENDOR",
}
