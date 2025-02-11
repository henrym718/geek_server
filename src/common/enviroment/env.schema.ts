import { z } from "zod";

export const envSchema = z.object({
    // Servicdor
    PORT: z.string().min(1).transform(Number),

    // Base de datos
    DATABASE_URL: z.string().url().min(1),

    // Autenticación
    KEY_SECRET_TOKEN: z.string().min(32),
    ACCESS_TOKEN_EXPIRATION: z.string(),
    REFRESH_TOKEN_EXPIRATION: z.string(),
});

export type Env = z.infer<typeof envSchema>;
