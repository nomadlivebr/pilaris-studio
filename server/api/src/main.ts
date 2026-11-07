import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module.js';
import { configureApp } from './bootstrap/configure-app.js';
import { SWAGGER_PATH } from './bootstrap/swagger.js';
import { AppConfigService } from './config/app-config.service.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const logger = app.get(Logger);
  app.useLogger(logger);

  configureApp(app);

  const config = app.get(AppConfigService);
  const port = config.get('API_PORT');
  await app.listen(port);

  logger.log(`API disponível em http://localhost:${port}`, 'Bootstrap');
  if (config.get('SWAGGER_ENABLED')) {
    logger.log(`Swagger disponível em http://localhost:${port}/${SWAGGER_PATH}`, 'Bootstrap');
  }
}

await bootstrap();
