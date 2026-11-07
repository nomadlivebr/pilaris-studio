import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@pilaris/database';
import { type ApiError } from '@pilaris/shared';
import { type Request } from 'express';

/** Erros conhecidos do Prisma mapeados para respostas HTTP sem expor detalhes internos. */
const PRISMA_ERROR_MAP: Record<string, { status: HttpStatus; message: string }> = {
  P2002: { status: HttpStatus.CONFLICT, message: 'Registro já existente' },
  P2025: { status: HttpStatus.NOT_FOUND, message: 'Registro não encontrado' },
  P2003: { status: HttpStatus.BAD_REQUEST, message: 'Referência inválida a outro registro' },
};

/**
 * Tratamento global de erros: toda resposta de erro segue o formato `ApiError`
 * e erros inesperados nunca vazam stack trace ou mensagens internas ao cliente.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly adapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.adapterHost;
    const request = host.switchToHttp().getRequest<Request & { id?: string }>();
    const { status, message } = this.resolve(exception);

    // Somente falhas inesperadas geram log com stack; HttpExceptions são respostas previstas.
    if (status >= 500 && !(exception instanceof HttpException)) {
      this.logger.error(
        exception instanceof Error ? (exception.stack ?? exception.message) : String(exception),
      );
    }

    const body: ApiError = {
      statusCode: status,
      error: this.statusText(status),
      message,
      path: httpAdapter.getRequestUrl(request) as string,
      timestamp: new Date().toISOString(),
      requestId: request.id,
    };

    httpAdapter.reply(host.switchToHttp().getResponse(), body, status);
  }

  private resolve(exception: unknown): { status: number; message: string | string[] } {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const message =
        typeof response === 'object' && response !== null && 'message' in response
          ? (response as { message: string | string[] }).message
          : exception.message;
      return { status: exception.getStatus(), message };
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const mapped = PRISMA_ERROR_MAP[exception.code];
      if (mapped) {
        return { status: mapped.status, message: mapped.message };
      }
    }

    return { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Erro interno do servidor' };
  }

  private statusText(status: number): string {
    const name = HttpStatus[status];
    if (!name) return 'Error';
    return name
      .toLowerCase()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
