import { AuthResponseDto } from "../../application/dtos/auth-response.dto";
import { LocalCredentialsDto } from "../../application/dtos/local-credentials.dto";
import { LocalAuthPort } from "../../application/ports/local-auth.port";

export class LocalAuthServices implements LocalAuthPort {
    async login(credentials: LocalCredentialsDto): Promise<AuthResponseDto> {
        throw new Error("Method not implemented.");
    }

    async register(credentials: LocalCredentialsDto): Promise<AuthResponseDto> {
        throw new Error("Method not implemented.");
    }
}
