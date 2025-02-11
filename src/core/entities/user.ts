import { HttpException } from "@Common/exceptions/http.exception";
import { EmailVO, IdVO, PasswordVO, ProviderVO, RoleVO, TokenVO } from "../value-objects";

interface UserCreateProps {
    readonly id: IdVO;
    readonly email: EmailVO;
    readonly provider: ProviderVO;
    readonly role: RoleVO;
    readonly refreshToken: TokenVO;
    readonly password?: PasswordVO;
    readonly tokenProvider?: TokenVO;
}

interface UserProps {
    readonly id: IdVO;
    readonly email: EmailVO;
    readonly provider: ProviderVO;
    readonly role: RoleVO;
    readonly password: PasswordVO | null;
    readonly tokenProvider: TokenVO | null;
    readonly refreshToken: TokenVO;
    readonly isActive: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
}

export class User {
    private constructor(private readonly props: UserProps) {}

    static create(props: UserCreateProps): User {
        if ((props.password && props.tokenProvider) || (!props.password && !props.tokenProvider)) {
            throw HttpException.badRequest("Debe proporcionar password o tokenProvider, pero no ambos");
        }
        const now = new Date();
        return new User({
            ...props,
            password: props.password || null,
            tokenProvider: props.tokenProvider || null,
            isActive: true,
            createdAt: now,
            updatedAt: null,
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
    get updatedAt(): Date | null {
        return this.props.updatedAt;
    }
}
