import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from './generated/prisma/client.js';

export interface PrismaConnectionOptions {
  databaseUrl: string;
  /** Registra as queries no log (somente desenvolvimento). */
  logQueries?: boolean;
}

/**
 * Opções do PrismaClient usando o driver adapter oficial do PostgreSQL (`pg`).
 * Útil para classes que estendem PrismaClient (ex.: PrismaService da API).
 */
export function createPrismaClientOptions({
  databaseUrl,
  logQueries = false,
}: PrismaConnectionOptions) {
  return {
    adapter: new PrismaPg({ connectionString: databaseUrl }),
    log: logQueries ? (['query', 'warn', 'error'] as const) : (['warn', 'error'] as const),
  } satisfies ConstructorParameters<typeof PrismaClient>[0];
}

/** Cria um PrismaClient isolado (scripts, seeds, testes). */
export function createPrismaClient(options: PrismaConnectionOptions): PrismaClient {
  return new PrismaClient(createPrismaClientOptions(options));
}
