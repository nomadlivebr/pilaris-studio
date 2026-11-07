import { type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { APP_VERSION } from '../app.constants.js';

export const SWAGGER_PATH = 'docs';

/** Documentação OpenAPI em /docs (interface) e /docs-json (especificação). */
export function setupSwagger(app: INestApplication): void {
  const document = new DocumentBuilder()
    .setTitle('Pilaris Studio API')
    .setDescription('API REST da plataforma de gestão de estúdios de Pilates Pilaris Studio.')
    .setVersion(APP_VERSION)
    // Preparado para a Fase 2 (JWT). Ainda não há rotas protegidas.
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  SwaggerModule.setup(SWAGGER_PATH, app, () => SwaggerModule.createDocument(app, document), {
    jsonDocumentUrl: `${SWAGGER_PATH}-json`,
    customSiteTitle: 'Pilaris Studio API',
  });
}
