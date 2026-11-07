import { z } from 'zod';

/**
 * Variáveis públicas do painel web (expostas no navegador).
 * Nunca adicione credenciais aqui — elas pertencem somente à API.
 */
const envSchema = z.object({
  VITE_API_URL: z.url().default('http://localhost:3333'),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  throw new Error(
    `Variáveis de ambiente inválidas no painel web:\n${z.prettifyError(parsed.error)}`,
  );
}

export const env = parsed.data;
