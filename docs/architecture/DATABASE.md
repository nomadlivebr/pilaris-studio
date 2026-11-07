# Banco de dados — Pilaris Studio

PostgreSQL acessado exclusivamente pela API, via Prisma 7 com o driver adapter oficial `@prisma/adapter-pg`.

## Arquivos

| Caminho                                      | Conteúdo                                                                            |
| -------------------------------------------- | ----------------------------------------------------------------------------------- |
| `database/schema/schema.prisma`              | Modelos, enums e índices                                                            |
| `database/migrations/`                       | Migrations SQL geradas pelo Prisma (versionadas no Git)                             |
| `database/seeds/seed.ts`                     | Dados de desenvolvimento (idempotente)                                              |
| `database/prisma.config.ts`                  | Caminhos do schema/migrations/seed e `DATABASE_URL` (lida do `.env` da raiz)        |
| `database/src/`                              | `createPrismaClient` / `createPrismaClientOptions` e reexportação do cliente gerado |
| `database/src/generated/`                    | Cliente gerado por `prisma generate` (não versionado)                               |
| `database/scripts/create-local-database.sql` | Cria usuário e banco num PostgreSQL instalado no Windows                            |

## Modelo multi-tenant

Cada **estúdio** é um tenant. A estratégia é _banco compartilhado, schema compartilhado, coluna discriminadora_: toda tabela de negócio possui `studio_id`.

Tabelas da Fase 1:

| Tabela               | Descrição                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `studios`            | Tenant. `slug` único, `status` (ACTIVE/SUSPENDED).                                                                       |
| `studio_settings`    | Configurações 1:1 do estúdio (fuso horário, idioma, moeda).                                                              |
| `users`              | Identidade global de quem acessa o sistema (e-mail único, `password_hash` preenchido na Fase 2).                         |
| `studio_memberships` | Vínculo usuário ↔ estúdio com o perfil (`user_role`). Uma pessoa pode atuar em mais de um estúdio com perfis diferentes. |

Perfis (`user_role`): `OWNER`, `ADMIN`, `INSTRUCTOR`, `RECEPTIONIST`, `STUDENT` — espelhados em `packages/shared/src/auth/user-role.ts`.

### Regras para novas entidades (Fase 2+)

Alunos, professores, planos, agendamentos, aulas, presenças, pagamentos, despesas e notificações devem:

1. Ter `studioId String @map("studio_id") @db.Uuid` com relação para `Studio` (`onDelete: Cascade` ou `Restrict`, conforme o caso).
2. Ter `@@index([studioId, ...])` começando por `studioId`; unicidades de negócio devem ser compostas (ex.: `@@unique([studioId, email])`).
3. Ser consultadas sempre com o estúdio do contexto autenticado — use `scopeToStudio(context, where)` de `@pilaris/services`; nunca aceite `studioId` vindo do corpo da requisição.
4. Usar UUID v7 (`@default(uuid(7)) @db.Uuid`), `created_at`/`updated_at` em `timestamptz`, nomes de tabela/coluna em snake_case via `@@map`/`@map`.
5. Valores monetários em centavos (`Int`) ou `Decimal`, nunca `Float`.

## Comandos (PowerShell, na raiz)

```powershell
pnpm db:up                 # PostgreSQL via Docker (porta 5433)
pnpm db:migrate            # cria uma migration a partir do schema e aplica (desenvolvimento)
pnpm db:migrate:deploy     # aplica migrations pendentes (homologação/produção, sem criar novas)
pnpm db:seed               # estúdio de demonstração
pnpm db:generate           # regenera o cliente Prisma
pnpm db:studio             # interface visual do banco
pnpm --filter @pilaris/database db:migrate:status
```

Para nomear a migration: `pnpm db:migrate --name add_students`.

### Fluxo para alterar o banco

1. Edite `database/schema/schema.prisma`.
2. `pnpm db:migrate --name descricao_curta` — gera `database/migrations/<timestamp>_descricao_curta/migration.sql` e aplica.
3. Revise o SQL gerado e versione a pasta da migration junto com o schema.
4. Nunca edite migrations já aplicadas em outros ambientes; crie uma nova.

> `prisma migrate dev` usa um _shadow database_ temporário; por isso o usuário do banco precisa da permissão `CREATEDB` (já concedida pelo script SQL e pelo usuário padrão do Docker).

## Opções de PostgreSQL local

**Docker Desktop (recomendado):** `pnpm db:up` sobe `postgres:17-alpine` na porta **5433** (evita conflito com um PostgreSQL instalado na 5432), com volume persistente `pilaris-postgres-data` e healthcheck. Usuário, senha e banco vêm do `.env`.

**PostgreSQL instalado no Windows:**

```powershell
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -h localhost -p 5432 `
  -v app_password="'SUA_SENHA'" -f database/scripts/create-local-database.sql
```

Depois, no `.env`: `DATABASE_URL=postgresql://pilaris:SUA_SENHA@localhost:5432/pilaris_studio?schema=public`.
