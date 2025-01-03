import { z } from "zod";

export const envSchema = z.object({
    PORT: z.string().min(1).transform(Number),
});

export type Env = z.infer<typeof envSchema>;
