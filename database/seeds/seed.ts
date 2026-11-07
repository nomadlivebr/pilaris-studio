/**
 * Seed de DESENVOLVIMENTO. Cria apenas um estúdio de demonstração com dados
 * fictícios e identificáveis — nunca adicione dados reais ou credenciais aqui.
 * Idempotente: pode ser executado várias vezes.
 */
import { resolve } from 'node:path';

import { config } from 'dotenv';

import { createPrismaClient } from '../src/client.js';

config({ path: resolve(import.meta.dirname, '../../.env'), quiet: true });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL não definida. Configure o arquivo .env na raiz do projeto.');
}
if (process.env.NODE_ENV === 'production') {
  throw new Error('O seed de desenvolvimento não deve ser executado em produção.');
}

const prisma = createPrismaClient({ databaseUrl });

async function main(): Promise<void> {
  const studio = await prisma.studio.upsert({
    where: { slug: 'estudio-demonstracao' },
    update: {},
    create: {
      name: 'Estúdio Demonstração',
      slug: 'estudio-demonstracao',
      settings: { create: {} },
    },
  });

  console.warn(`[seed] Estúdio de demonstração pronto: ${studio.name} (${studio.id})`);
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}
