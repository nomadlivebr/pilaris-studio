import { type INestApplication, RequestMethod } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import helmet from 'helmet';

import { API_PREFIX } from '../app.constants.js';
import { AllExceptionsFilter } from '../common/filters/all-exceptions.filter.js';
import { AppConfigService } from '../config/app-config.service.js';
import { setupSwagger } from './swagger.js';

/**
 * Configuração HTTP compartilhada entre a inicialização real (main.ts) e os testes e2e,
 * garantindo que ambos se comportem da mesma forma.
 */
export function configureApp(app: INestApplication): void {
  const config = app.get(AppConfigService);

  app.setGlobalPrefix(API_PREFIX, {
    exclude: [
      { path: 'health', method: RequestMethod.GET },
      { path: 'health/database', method: RequestMethod.GET },
    ],
  });

  app.use(helmet());

  app.enableCors({
    origin: config.get('CORS_ORIGINS'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  if (config.get('SWAGGER_ENABLED')) {
    setupSwagger(app);
  }

  app.enableShutdownHooks();
}
