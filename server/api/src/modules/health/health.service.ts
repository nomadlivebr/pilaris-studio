import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { type DatabaseHealthResponse, type HealthResponse } from '@pilaris/shared';

import { APP_SERVICE_NAME, APP_VERSION } from '../../app.constants.js';
import { AppConfigService } from '../../config/app-config.service.js';
import { PrismaService } from '../../infrastructure/prisma/prisma.service.js';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    private readonly config: AppConfigService,
    private readonly prisma: PrismaService,
  ) {}

  getStatus(): HealthResponse {
    return {
      status: 'ok',
      service: APP_SERVICE_NAME,
      version: APP_VERSION,
      environment: this.config.get('NODE_ENV'),
      uptimeSeconds: Math.round(process.uptime() * 100) / 100,
      timestamp: new Date().toISOString(),
    };
  }

  async getDatabaseStatus(): Promise<DatabaseHealthResponse> {
    try {
      const latencyMs = await this.prisma.ping();
      return {
        status: 'ok',
        database: 'postgresql',
        latencyMs,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.warn(
        `Verificação do banco falhou: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new ServiceUnavailableException('Banco de dados indisponível');
    }
  }
}
