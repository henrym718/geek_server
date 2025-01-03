import path from "path";
import fs from "fs/promises";
import { Env, envSchema } from "../common/env.schema";
import { logger } from "../common/logger";

export class EnvBootstrap {
    private static env: Env;

    public async initialize(): Promise<void> {
        const envPath = this.getEnvPath();
        await this.ensureEnvFileExists(envPath);
        process.loadEnvFile(envPath);
        EnvBootstrap.env = this.validateEnvFile(process.env);
        logger.info(`✅ Enviroment loaded: ${process.env.NODE_ENV}`);
    }

    private getEnvPath(): string {
        const enviroment = process.env.NODE_EMV ?? "development";
        return path.resolve(process.cwd(), `.env.${enviroment}`);
    }

    private async ensureEnvFileExists(envPath: string) {
        try {
            await fs.access(envPath);
        } catch {
            throw new Error(`Env file not found at ${envPath}`);
        }
    }

    private validateEnvFile(env: NodeJS.ProcessEnv) {
        const result = envSchema.safeParse(env);
        if (!result.success) {
            const errorFormated = result.error.issues.map((issue) => `${"\n"} - ${issue.path}: ${issue.message}`).join("");
            throw new Error(`enviroment validation error: ${errorFormated}`);
        }
        return result.data;
    }

    public static get ENV() {
        return this.env;
    }
}
