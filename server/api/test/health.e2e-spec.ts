import { type INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { apiErrorSchema, healthResponseSchema } from '@pilaris/shared';
import request from 'supertest';

import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/bootstrap/configure-app.js';
import { PrismaService } from '../src/infrastructure/prisma/prisma.service.js';

describe('Health (e2e)', () => {
  let app: INestApplication;
  const prismaMock = {
    ping: vi.fn(),
    onModuleInit: vi.fn(),
    onModuleDestroy: vi.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /health → 200', async () => {
    const response = await request(app.getHttpServer()).get('/health').expect(200);
    expect(healthResponseSchema.safeParse(response.body).success).toBe(true);
  });

  it('GET /health/database → 200 quando o banco responde', async () => {
    prismaMock.ping.mockResolvedValueOnce(2);
    const response = await request(app.getHttpServer()).get('/health/database').expect(200);
    expect(response.body).toMatchObject({ status: 'ok', database: 'postgresql', latencyMs: 2 });
  });

  it('GET /health/database → 503 no formato padrão de erro', async () => {
    prismaMock.ping.mockRejectedValueOnce(new Error('down'));
    const response = await request(app.getHttpServer()).get('/health/database').expect(503);
    expect(apiErrorSchema.safeParse(response.body).success).toBe(true);
    expect(response.body.message).toBe('Banco de dados indisponível');
  });

  it('rota inexistente → 404 no formato padrão de erro', async () => {
    const response = await request(app.getHttpServer()).get('/api/v1/nao-existe').expect(404);
    expect(apiErrorSchema.safeParse(response.body).success).toBe(true);
  });

  it('GET /docs-json → especificação OpenAPI', async () => {
    const response = await request(app.getHttpServer()).get('/docs-json').expect(200);
    expect(response.body.paths).toHaveProperty('/health');
    expect(response.body.paths).toHaveProperty('/health/database');
  });
});
