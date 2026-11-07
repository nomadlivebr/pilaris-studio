import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { type ApiError } from '@pilaris/shared';

/** Formato padrão de erro de todas as rotas (ver AllExceptionsFilter). */
export class ApiErrorDto implements ApiError {
  @ApiProperty({ example: 503 })
  statusCode!: number;

  @ApiProperty({ example: 'Service Unavailable' })
  error!: string;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
    example: 'Banco de dados indisponível',
  })
  message!: string | string[];

  @ApiProperty({ example: '/health/database' })
  path!: string;

  @ApiProperty({ example: '2026-01-01T12:00:00.000Z' })
  timestamp!: string;

  @ApiPropertyOptional({ example: '1f0c7a3e-5a1b-4c1e-9a52-0d3c8f6f1b2a' })
  requestId?: string;
}
