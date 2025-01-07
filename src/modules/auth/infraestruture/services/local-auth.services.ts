import { AuthResponseDto } from "@Auth/application/dtos/auth-response.dto";
import { LocalCredentialsDto } from "@Auth/application/dtos/local-credentials.dto";
import { LocalAuthPort } from "@Auth/application/ports/local-auth.port";

export class LocalAuthServices implements LocalAuthPort {
    async authenticate(credentials: LocalCredentialsDto): Promise<AuthResponseDto> {
        if (await this.isExistingUser(credentials.email)) {
            // Si el usuario existe, manejar como login
            return this.handleLogin(credentials);
        } else {
            // Si no existe, manejar como registro
            return this.handleRegister(credentials);
        }
    }

    private async isExistingUser(email: string): Promise<boolean> {
        // Lógica para verificar si el usuario ya existe en la base de datos
        throw new Error("Method not implemented.");
    }

    private async handleLogin(credentials: LocalCredentialsDto): Promise<AuthResponseDto> {
        // Lógica para validar las credenciales e iniciar sesión
        throw new Error("Method not implemented.");
    }

    private async handleRegister(credentials: LocalCredentialsDto): Promise<AuthResponseDto> {
        // Lógica para registrar al nuevo usuario
        throw new Error("Method not implemented.");
    }
}
