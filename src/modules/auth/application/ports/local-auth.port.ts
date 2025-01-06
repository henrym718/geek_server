import { AuthResponseDto } from "../dtos/auth-response.dto";
import { LocalCredentialsDto } from "../dtos/local-credentials.dto";

export interface LocalAuthPort {
    login(credentials: LocalCredentialsDto): Promise<AuthResponseDto>;
    register(credentials: LocalCredentialsDto): Promise<AuthResponseDto>;
}
