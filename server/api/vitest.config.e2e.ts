import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: ['test/**/*.e2e-spec.ts'],
    // Valores apenas para teste: o PrismaService é substituído por um mock.
    env: {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://test:test@localhost:5432/test',
      LOG_LEVEL: 'error',
      SWAGGER_ENABLED: 'true',
    },
  },
});
