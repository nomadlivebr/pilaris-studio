import { z } from 'zod';

/** Variáveis de ambiente obrigatórias/aceitas pela API. Validadas na inicialização. */
export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().int().min(1).max(65535).default(3333),
  DATABASE_URL: z
    .string({ error: 'DATABASE_URL é obrigatória' })
    .refine((value) => /^postgres(ql)?:\/\//.test(value), {
      error: 'DATABASE_URL deve ser uma URL postgresql://',
    }),
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:5173')
    .transform((value) =>
      value
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean),
    ),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  SWAGGER_ENABLED: z.stringbool().default(true),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    throw new Error(`Variáveis de ambiente inválidas:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}
