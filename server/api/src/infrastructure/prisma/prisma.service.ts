import { Injectable, Logger, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common';
import { PrismaClient, createPrismaClientOptions } from '@pilaris/database';

import { AppConfigService } from '../../config/app-config.service.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor(config: AppConfigService) {
    super(createPrismaClientOptions({ databaseUrl: config.get('DATABASE_URL') }));
  }

  /**
   * Tenta conectar na inicialização, mas não derruba a API se o banco estiver
   * indisponível: o estado fica visível em GET /health/database.
   */
  async onModuleInit(): Promise<void> {
    try {
      // Com driver adapter, $connect() não abre conexão; a consulta confirma o acesso real.
      await this.ping();
      this.logger.log('Conectado ao PostgreSQL');
    } catch (error) {
      this.logger.error(
        `Não foi possível conectar ao PostgreSQL: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  /** Executa uma consulta trivial e retorna a latência em milissegundos. */
  async ping(): Promise<number> {
    const startedAt = performance.now();
    await this.$queryRaw`SELECT 1`;
    return Math.round((performance.now() - startedAt) * 100) / 100;
  }
}
