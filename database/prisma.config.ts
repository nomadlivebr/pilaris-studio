import { resolve } from 'node:path';

import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

// As variáveis do servidor ficam no .env da raiz do monorepo.
config({ path: resolve(import.meta.dirname, '../.env'), quiet: true });

export default defineConfig({
  schema: 'schema/schema.prisma',
  migrations: {
    path: 'migrations',
    seed: 'tsx seeds/seed.ts',
  },
  datasource: {
    // `prisma generate` não precisa de conexão; migrate/seed falham com erro claro se ausente.
    url: process.env.DATABASE_URL ?? '',
  },
});
