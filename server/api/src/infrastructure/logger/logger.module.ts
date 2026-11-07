import { randomUUID } from 'node:crypto';

import { Module } from '@nestjs/common';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

import { AppConfigService } from '../../config/app-config.service.js';

const REQUEST_ID_HEADER = 'x-request-id';

/** Logs estruturados em JSON (pino). Em desenvolvimento, saída legível via pino-pretty. */
@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
        pinoHttp: {
          level: config.get('LOG_LEVEL'),
          genReqId: (req, res) => {
            const incoming = req.headers[REQUEST_ID_HEADER];
            const id = typeof incoming === 'string' && incoming ? incoming : randomUUID();
            res.setHeader(REQUEST_ID_HEADER, id);
            return id;
          },
          customLogLevel: (_req, res, error) => {
            if (error || res.statusCode >= 500) return 'error';
            if (res.statusCode >= 400) return 'warn';
            return 'info';
          },
          // Erros reais já são registrados com stack pelo AllExceptionsFilter;
          // aqui basta a mensagem para não duplicar o rastro no log de acesso.
          serializers: {
            err: (error: Error) => ({ type: error.name, message: error.message }),
          },
          redact: ['req.headers.authorization', 'req.headers.cookie', 'res.headers["set-cookie"]'],
          transport: config.isDevelopment
            ? {
                target: 'pino-pretty',
                options: { singleLine: true, translateTime: 'SYS:HH:MM:ss' },
              }
            : undefined,
        },
      }),
    }),
  ],
})
export class LoggerModule {}
