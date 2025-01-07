import { AuthResponseDto } from "../dtos/auth-response.dto";
import { LocalCredentialsDto } from "../dtos/local-credentials.dto";

export interface LocalAuthPort {
    authenticate(credentials: LocalCredentialsDto): Promise<AuthResponseDto>;
}
