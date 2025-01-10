import { HttpException } from "@Common/http.exception";
import { EmailVO, IdVO, PasswordVO, ProviderVO, RoleVO, TokenVO } from "@Domain/value-objects";

export interface UserCreateProps {
    readonly id: IdVO;
    readonly provider: ProviderVO;
    readonly role: RoleVO;
    readonly email: EmailVO;
    readonly refreshToken: TokenVO;
    readonly password?: PasswordVO;
    readonly tokenProvider?: TokenVO;
}

export interface UserProps {
    readonly id: IdVO;
    readonly email: EmailVO;
    readonly provider: ProviderVO;
    readonly password: PasswordVO | null;
    readonly tokenProvider: TokenVO | null;
    readonly role: RoleVO;
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

    public toJSON() {
        return {
            id: this.props.id.getValue(),
            email: this.props.email.getValue(),
            provider: this.props.provider.getValue(),
            password: this.props.password ? this.props.password.getValue() : null,
            tokenProvider: this.props.tokenProvider ? this.props.tokenProvider.getValue() : null,
            role: this.props.role.getValue(),
            refreshToken: this.props.refreshToken.getValue(),
            isActive: this.props.isActive,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt,
        };
    }
}
