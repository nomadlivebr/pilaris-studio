import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ApiErrorDto } from '../../common/dto/api-error.dto.js';
import { DatabaseHealthResponseDto, HealthResponseDto } from './dto/health-response.dto.js';
import { HealthService } from './health.service.js';

@ApiTags('Saúde')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({ summary: 'Verifica se a API está no ar' })
  @ApiOkResponse({ type: HealthResponseDto })
  getStatus(): HealthResponseDto {
    return this.healthService.getStatus();
  }

  @Get('database')
  @ApiOperation({ summary: 'Verifica a disponibilidade do PostgreSQL' })
  @ApiOkResponse({ type: DatabaseHealthResponseDto })
  @ApiServiceUnavailableResponse({ type: ApiErrorDto, description: 'Banco indisponível' })
  getDatabaseStatus(): Promise<DatabaseHealthResponseDto> {
    return this.healthService.getDatabaseStatus();
  }
}
