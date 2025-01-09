import { AuthProviderEnum } from "../domain/entities/user";
import { HttpException } from "./http.exception";

export const toProvider = (provider: string): AuthProviderEnum => {
    const authProvderEnum = AuthProviderEnum[provider as keyof typeof AuthProviderEnum];
    if (authProvderEnum === undefined) {
        throw HttpException.badRequest(`Invalid PROVIDER: ${provider}`);
    }
    return authProvderEnum;
};
