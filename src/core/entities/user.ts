import { UsernameVO } from "@Core/value-objects/username.vo";
import { EmailVO, IdVO, PasswordVO, ProviderVO, RoleVO, TokenVO } from "../value-objects";

interface UserProps {
    readonly id: IdVO;
    readonly username: UsernameVO;
    readonly email: EmailVO;
    readonly password: PasswordVO | null;
    readonly provider: ProviderVO;
    readonly tokenProvider: TokenVO | null;
    readonly role: RoleVO;
    readonly refreshToken: TokenVO;
    readonly isActive: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export class User {
    private constructor(private readonly props: UserProps) {}

    static create(props: Omit<UserProps, "createdAt" | "updatedAt" | "isActive">): User {
        return new User({
            ...props,
            password: props.password || null,
            tokenProvider: props.tokenProvider || null,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static reconstitute(props: UserProps): User {
        return new User(props);
    }

    updateRefreshToken(refreshToken: TokenVO): User {
        return new User({
            ...this.props,
            refreshToken,
            updatedAt: new Date(),
        });
    }

    get id(): IdVO {
        return this.props.id;
    }
    get email(): EmailVO {
        return this.props.email;
    }
    get provider(): ProviderVO {
        return this.props.provider;
    }
    get password(): PasswordVO | null {
        return this.props.password;
    }
    get tokenProvider(): TokenVO | null {
        return this.props.tokenProvider;
    }
    get role(): RoleVO {
        return this.props.role;
    }
    get refreshToken(): TokenVO {
        return this.props.refreshToken;
    }
    get isActive(): boolean {
        return this.props.isActive;
    }
    get createdAt(): Date {
        return this.props.createdAt;
    }
    get updatedAt(): Date {
        return this.props.updatedAt;
    }
    get username(): UsernameVO {
        return this.props.username;
    }
}
