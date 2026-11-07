import { ApiProperty } from '@nestjs/swagger';
import { type DatabaseHealthResponse, type HealthResponse } from '@pilaris/shared';

export class HealthResponseDto implements HealthResponse {
  @ApiProperty({ enum: ['ok', 'error'], example: 'ok' })
  status!: 'ok' | 'error';

  @ApiProperty({ example: 'pilaris-api' })
  service!: string;

  @ApiProperty({ example: '0.1.0' })
  version!: string;

  @ApiProperty({ example: 'development' })
  environment!: string;

  @ApiProperty({ example: 42.5, description: 'Tempo em execução, em segundos' })
  uptimeSeconds!: number;

  @ApiProperty({ example: '2026-01-01T12:00:00.000Z' })
  timestamp!: string;
}

export class DatabaseHealthResponseDto implements DatabaseHealthResponse {
  @ApiProperty({ enum: ['ok', 'error'], example: 'ok' })
  status!: 'ok' | 'error';

  @ApiProperty({ enum: ['postgresql'], example: 'postgresql' })
  database!: 'postgresql';

  @ApiProperty({ example: 1.27, description: 'Latência da consulta de verificação, em ms' })
  latencyMs!: number;

  @ApiProperty({ example: '2026-01-01T12:00:00.000Z' })
  timestamp!: string;
}
