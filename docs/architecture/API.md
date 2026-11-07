# API — Pilaris Studio

API REST em NestJS 12 (ESM), documentada com Swagger/OpenAPI.

## Endereços

| Rota                   | Descrição                                                                      |
| ---------------------- | ------------------------------------------------------------------------------ |
| `GET /health`          | Liveness: a API está no ar (não depende do banco).                             |
| `GET /health/database` | Executa `SELECT 1` no PostgreSQL. `200` com latência ou `503` se indisponível. |
| `GET /docs`            | Swagger UI (desligável com `SWAGGER_ENABLED=false`).                           |
| `GET /docs-json`       | Especificação OpenAPI em JSON (útil para gerar clientes).                      |
| `/api/v1/*`            | Prefixo de todas as rotas de negócio (Fase 2+).                                |

As rotas de saúde ficam fora do prefixo para uso direto por load balancers e monitoramento.

Exemplo (PowerShell):

```powershell
Invoke-RestMethod http://localhost:3333/health
Invoke-RestMethod http://localhost:3333/health/database
```

## Organização do código (`server/api/src`)

```
main.ts                      inicialização (logger, porta)
app.module.ts                composição de módulos
app.constants.ts             nome, versão, prefixo
bootstrap/
  configure-app.ts           prefixo, Helmet, CORS, filtro global, Swagger, shutdown hooks
  swagger.ts                 DocumentBuilder
config/
  env.schema.ts              schema Zod das variáveis de ambiente
  config.module.ts           carrega .env (local e raiz) e valida
  app-config.service.ts      acesso tipado às variáveis
infrastructure/
  prisma/                    PrismaService (global)
  logger/                    pino (nestjs-pino)
common/
  filters/all-exceptions.filter.ts
  pipes/zod-validation.pipe.ts
  dto/api-error.dto.ts
modules/
  health/                    controller, service, DTOs e testes
```

### Convenções para novos módulos

- Um módulo por domínio em `src/modules/<dominio>` (ex.: `students`), com `*.module.ts`, `*.controller.ts`, `*.service.ts`, `dto/`.
- Controllers: somente HTTP (rota, validação, status, Swagger). Regras de negócio em `@pilaris/services`; acesso a dados via `PrismaService` sempre filtrado por `studioId`.
- Validação de entrada com schemas Zod de `@pilaris/shared` + `ZodValidationPipe`:
  ```ts
  @Post()
  create(@Body(new ZodValidationPipe(createStudentSchema)) body: CreateStudentInput) {}
  ```
- DTOs de resposta como classes com `@ApiProperty` que `implements` o tipo do schema compartilhado — o Swagger fica documentado e o compilador garante a compatibilidade.
- Rotas em inglês e no plural (`/api/v1/students`); mensagens ao usuário em português.

## Formato de erro

Todas as respostas de erro seguem `apiErrorSchema` (`@pilaris/shared`):

```json
{
  "statusCode": 503,
  "error": "Service Unavailable",
  "message": "Banco de dados indisponível",
  "path": "/health/database",
  "timestamp": "2026-10-31T12:53:15.276Z",
  "requestId": "aff88165-533d-40aa-92c4-2ad6111a5324"
}
```

- `HttpException` mantém status e mensagem.
- Erros conhecidos do Prisma são traduzidos (`P2002` → 409, `P2025` → 404, `P2003` → 400).
- Qualquer outro erro vira `500 "Erro interno do servidor"`; o stack trace vai apenas para o log.

## Logs

- `nestjs-pino`: JSON estruturado em produção; formato legível (`pino-pretty`) em desenvolvimento.
- Cada requisição recebe um `x-request-id` (reaproveita o do cliente, se enviado) devolvido no cabeçalho e no corpo de erro.
- `authorization`, `cookie` e `set-cookie` são redigidos.
- Nível por `LOG_LEVEL` (`info` padrão). 4xx são registrados como `warn`, 5xx como `error`.

## Variáveis de ambiente

| Variável          | Obrigatória | Padrão                  | Descrição                                                   |
| ----------------- | ----------- | ----------------------- | ----------------------------------------------------------- |
| `DATABASE_URL`    | sim         | —                       | `postgresql://usuario:senha@host:porta/banco?schema=public` |
| `NODE_ENV`        | não         | `development`           | `development`, `test`, `production`                         |
| `API_PORT`        | não         | `3333`                  | Porta HTTP                                                  |
| `CORS_ORIGINS`    | não         | `http://localhost:5173` | Lista separada por vírgulas                                 |
| `LOG_LEVEL`       | não         | `info`                  | `fatal`…`trace`                                             |
| `SWAGGER_ENABLED` | não         | `true`                  | `true`/`false`                                              |

Arquivos lidos: `server/api/.env` (opcional, sobrescreve) e `.env` da raiz.

## Autenticação (Fase 2)

Preparado: Swagger com esquema Bearer JWT, `UserRole` e `StudioMembership` no banco, `TenantContext` em `@pilaris/services`, variáveis `JWT_*` comentadas no `.env.example`. A implementar: módulo `auth` (login, refresh token rotativo armazenado com hash, logout), guard JWT global com rotas públicas explícitas, decorator `@Roles()` e resolução do estúdio ativo por requisição.

## Testes

```powershell
pnpm --filter @pilaris/api test       # unitários (src/**/*.spec.ts)
pnpm --filter @pilaris/api test:e2e   # e2e com Supertest (test/**/*.e2e-spec.ts), Prisma mockado
```
