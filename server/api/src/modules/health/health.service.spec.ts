import { ServiceUnavailableException } from '@nestjs/common';
import { databaseHealthResponseSchema, healthResponseSchema } from '@pilaris/shared';

import { type AppConfigService } from '../../config/app-config.service.js';
import { type PrismaService } from '../../infrastructure/prisma/prisma.service.js';
import { HealthService } from './health.service.js';

describe('HealthService', () => {
  const config = { get: vi.fn().mockReturnValue('test') } as unknown as AppConfigService;

  it('retorna o status da API no formato compartilhado', () => {
    const service = new HealthService(config, {} as PrismaService);

    const result = service.getStatus();

    expect(healthResponseSchema.parse(result)).toEqual(result);
    expect(result.status).toBe('ok');
    expect(result.environment).toBe('test');
  });

  it('retorna a latência quando o banco responde', async () => {
    const prisma = { ping: vi.fn().mockResolvedValue(1.5) } as unknown as PrismaService;
    const service = new HealthService(config, prisma);

    const result = await service.getDatabaseStatus();

    expect(databaseHealthResponseSchema.parse(result)).toEqual(result);
    expect(result.latencyMs).toBe(1.5);
  });

  it('lança 503 quando o banco está indisponível', async () => {
    const prisma = {
      ping: vi.fn().mockRejectedValue(new Error('connection refused')),
    } as unknown as PrismaService;
    const service = new HealthService(config, prisma);

    await expect(service.getDatabaseStatus()).rejects.toBeInstanceOf(ServiceUnavailableException);
  });
});
