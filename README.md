# PILARIS STUDIO

Plataforma de gestão para estúdios de Pilates: painel administrativo web, aplicativo Android/iOS e API REST, organizados em um monorepo TypeScript.

> **Fase 1 — Fundação tecnológica.** Esta etapa entrega arquitetura, identidade visual, infraestrutura de banco e endpoints de saúde. Os módulos de negócio (alunos, agenda, financeiro…) começam na Fase 2.

## Stack

| Camada         | Tecnologias                                                             |
| -------------- | ----------------------------------------------------------------------- |
| Monorepo       | pnpm Workspaces + Turborepo                                             |
| Painel web     | React 19, Vite 8, TypeScript, Tailwind CSS 4, shadcn/ui, React Router 8 |
| Aplicativo     | React Native 0.88, Expo SDK 58, Expo Router, EAS Build                  |
| API            | Node.js, NestJS 12, Swagger/OpenAPI, pino (logs estruturados)           |
| Banco de dados | PostgreSQL + Prisma 7 (driver adapter `pg`)                             |
| Validação      | Zod 4 (schemas compartilhados)                                          |
| Infraestrutura | Docker Compose                                                          |

Versões exatas e justificativas: [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md#tecnologias-e-versões).

## Estrutura

```
pilaris-studio/
├── apps/
│   ├── web/                  Painel administrativo (React + Vite)
│   └── mobile/               Aplicativo Android e iOS (Expo)
├── server/
│   ├── api/                  API REST (NestJS)
│   ├── services/             Regras de negócio por domínio
│   └── integrations/
│       ├── payments/         Contratos de provedores de pagamento
│       └── notifications/    Contratos de canais de notificação
├── packages/
│   ├── shared/               Tipos, schemas Zod e paleta compartilhados
│   └── config/               TypeScript, ESLint e Prettier compartilhados
├── database/
│   ├── schema/               schema.prisma
│   ├── migrations/           Migrations versionadas
│   ├── seeds/                Dados de desenvolvimento
│   └── scripts/              Utilitários (ex.: criar banco local)
└── docs/architecture/        Documentação técnica
```

## Início rápido (PowerShell)

Pré-requisitos: Node.js 22.12+ (testado com 24), pnpm 12, Git e PostgreSQL (via Docker Desktop **ou** instalado no Windows).

```powershell
pnpm install
Copy-Item .env.example .env          # edite as credenciais do banco
pnpm db:up                           # somente se usar Docker
pnpm db:migrate                      # cria as tabelas
pnpm db:seed                         # estúdio de demonstração (opcional)
pnpm dev                             # API (3333) + painel web (5173)
pnpm dev:mobile                      # Expo (em outro terminal)
```

| Serviço        | Endereço                              |
| -------------- | ------------------------------------- |
| Painel web     | http://localhost:5173                 |
| API            | http://localhost:3333                 |
| Saúde da API   | http://localhost:3333/health          |
| Saúde do banco | http://localhost:3333/health/database |
| Swagger        | http://localhost:3333/docs            |

## Documentação

- [Arquitetura](docs/architecture/ARCHITECTURE.md) — visão geral, responsabilidades das pastas, tecnologias.
- [Banco de dados](docs/architecture/DATABASE.md) — modelo multi-tenant, migrations, seeds.
- [API](docs/architecture/API.md) — convenções REST, erros, logs, Swagger.
- [Desenvolvimento](docs/architecture/DEVELOPMENT.md) — instalação no Windows, execução, builds Android/iOS.

## Scripts principais

| Comando                  | Descrição                                   |
| ------------------------ | ------------------------------------------- |
| `pnpm dev`               | API + painel web em modo desenvolvimento    |
| `pnpm dev:api`           | Somente a API                               |
| `pnpm dev:web`           | Somente o painel web                        |
| `pnpm dev:mobile`        | Expo (aplicativo)                           |
| `pnpm build`             | Build de todos os projetos                  |
| `pnpm typecheck`         | Verificação de tipos em todo o monorepo     |
| `pnpm lint`              | ESLint em todo o monorepo                   |
| `pnpm test`              | Testes                                      |
| `pnpm format`            | Prettier                                    |
| `pnpm db:up` / `db:down` | Sobe/derruba o PostgreSQL do Docker Compose |
| `pnpm db:migrate`        | Cria/aplica migrations (desenvolvimento)    |
| `pnpm db:seed`           | Popula dados de desenvolvimento             |
| `pnpm db:studio`         | Prisma Studio                               |
