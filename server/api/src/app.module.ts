import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module.js';
import { LoggerModule } from './infrastructure/logger/logger.module.js';
import { PrismaModule } from './infrastructure/prisma/prisma.module.js';
import { HealthModule } from './modules/health/health.module.js';

@Module({
  imports: [
    // Infraestrutura
    ConfigModule,
    LoggerModule,
    PrismaModule,
    // Módulos de domínio (Fase 2+: auth, studios, students, instructors, ...)
    HealthModule,
  ],
})
export class AppModule {}
