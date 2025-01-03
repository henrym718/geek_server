import { z } from "zod";

export const envSchema = z.object({
    PORT: z.string().min(1).transform(Number),
    DATABASE_URL: z.string().url().min(1),
});

export type Env = z.infer<typeof envSchema>;
