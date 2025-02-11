import { HttpException } from "@Common/exceptions/http.exception";

export enum ProviderEnum {
    LOCAL = "LOCAL",
    GOOGLE = "GOOGLE",
}
export class ProviderVO {
    private constructor(private readonly provider: ProviderEnum) {}

    public static fromPlainText(provider: string): ProviderVO {
        const normalized = provider.toUpperCase();
        const providerEnum = ProviderEnum[normalized as keyof typeof ProviderEnum];

        if (!providerEnum) {
            HttpException.badRequest(`Invalid PROVIDER: ${provider}`);
        }

        return new ProviderVO(providerEnum);
    }

    public static fromEnum(provider: ProviderEnum): ProviderVO {
        return new ProviderVO(provider);
    }

    public equals(provider: ProviderVO): boolean {
        return this.provider === provider.getValue();
    }

    public getValue(): ProviderEnum {
        return this.provider;
    }
}
