# Arquitetura — Pilaris Studio

## 1. Visão geral

O Pilaris Studio é um monorepo TypeScript com três aplicações (painel web, aplicativo móvel e API) que compartilham tipos, validações e configurações por meio de pacotes internos.

```
                 ┌──────────────────┐     ┌──────────────────┐
                 │  apps/web        │     │  apps/mobile     │
                 │  React + Vite    │     │  Expo (RN)       │
                 └────────┬─────────┘     └────────┬─────────┘
                          │  HTTPS / JSON (REST)   │
                          └───────────┬────────────┘
                                      ▼
                         ┌─────────────────────────┐
                         │  server/api (NestJS)    │
                         │  controllers · módulos  │
                         └──────┬───────────┬──────┘
                                │           │
              ┌─────────────────▼──┐   ┌────▼────────────────────────┐
              │ server/services    │   │ server/integrations         │
              │ regras de negócio  │   │ payments · notifications    │
              └─────────┬──────────┘   └─────────────────────────────┘
                        ▼
              ┌────────────────────┐
              │ database (Prisma)  │──► PostgreSQL
              └────────────────────┘

   packages/shared  → tipos, schemas Zod e paleta (usados por todos)
   packages/config  → tsconfig, ESLint e Prettier (usados por todos)
```

Princípios:

- **Separação de camadas.** Frontends só conversam com a API via HTTP; nunca acessam o banco nem recebem credenciais.
- **Regras de negócio fora de componentes e controllers.** Controllers NestJS recebem/validam a requisição e delegam; a lógica de domínio vive em `server/services`; componentes visuais apenas exibem.
- **Contratos compartilhados.** Schemas Zod em `@pilaris/shared` definem o formato dos dados uma única vez e são usados na API (validação/DTOs) e nos clientes (validação de respostas).
- **Multi-tenant desde o início.** Toda entidade de negócio pertence a um estúdio (`studioId`). Ver [DATABASE.md](DATABASE.md).
- **Código em inglês, interface em português.** Nomes de arquivos, classes, tabelas e variáveis em inglês; textos exibidos ao usuário em pt-BR.

## 2. Responsabilidade de cada pasta

| Pasta                               | Pacote                   | Responsabilidade                                                                                                                                                                                                                                                                                                        |
| ----------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apps/web`                          | `@pilaris/web`           | Painel administrativo. `src/app` (rotas), `src/pages` (telas), `src/components/ui` (shadcn/ui), `src/components/brand` e `layout` (identidade), `src/features` (lógica de tela por funcionalidade: hooks + componentes), `src/lib` (cliente HTTP, env, utilitários), `src/styles/tokens.css` (tokens visuais centrais). |
| `apps/mobile`                       | `@pilaris/mobile`        | Aplicativo Android/iOS. `src/app` (rotas do Expo Router — cada arquivo é uma tela), `src/components`, `src/theme/tokens.ts` (tokens visuais), `app.json` (identificadores e ícones), `eas.json` (perfis de build).                                                                                                      |
| `server/api`                        | `@pilaris/api`           | API REST NestJS. `src/config` (env validado com Zod), `src/infrastructure` (Prisma, logger), `src/common` (filtros, pipes, DTOs comuns), `src/bootstrap` (CORS, Helmet, Swagger, prefixos), `src/modules` (um módulo por domínio).                                                                                      |
| `server/services`                   | `@pilaris/services`      | Regras de negócio por domínio, independentes de framework (testáveis sem NestJS). Hoje: contexto de tenant (`TenantContext`, `scopeToStudio`).                                                                                                                                                                          |
| `server/integrations/payments`      | `@pilaris/payments`      | Contrato `PaymentProvider`. Implementações de gateways (Pix, cartão, boleto) entram aqui.                                                                                                                                                                                                                               |
| `server/integrations/notifications` | `@pilaris/notifications` | Contrato `NotificationChannel`. Implementações (e-mail, push, WhatsApp, SMS) entram aqui.                                                                                                                                                                                                                               |
| `packages/shared`                   | `@pilaris/shared`        | Schemas Zod e tipos usados por API, web e mobile; perfis de usuário; paleta da marca. Sem dependência de Node ou DOM.                                                                                                                                                                                                   |
| `packages/config`                   | `@pilaris/config`        | `tsconfig` base/library/react, configs ESLint (base, node, react) e Prettier.                                                                                                                                                                                                                                           |
| `database`                          | `@pilaris/database`      | `schema/schema.prisma`, `migrations/`, `seeds/`, `prisma.config.ts` e o cliente Prisma gerado e exportado para a API.                                                                                                                                                                                                   |
| `docs/architecture`                 | —                        | Documentação técnica.                                                                                                                                                                                                                                                                                                   |

### Fluxo de dependências

```
apps/web, apps/mobile ─► @pilaris/shared
server/api ─► @pilaris/shared, @pilaris/services, @pilaris/database (+ integrations, quando usadas)
server/services ─► @pilaris/shared
todos ─► @pilaris/config (dev)
```

Dependências nunca apontam de `packages/*` para `apps/*` ou `server/*`, e os frontends nunca dependem de `@pilaris/database`.

### Pacotes internos compilados

`shared`, `services`, `integrations/*` e `database` compilam para `dist/` (ESM + `.d.ts`). O Turborepo garante a ordem: `dev`, `build`, `lint`, `typecheck` e `test` de um projeto rodam depois do `build` das suas dependências (`"dependsOn": ["^build"]`). Ao alterar um pacote interno com a API em execução, rode `pnpm --filter <pacote> dev` (watch) em outro terminal.

## 3. Tecnologias e versões

Versões instaladas na Fase 1 (outubro/2026). Todas estáveis; nenhuma beta/RC.

| Tecnologia   | Versão                         | Observação                                                                      |
| ------------ | ------------------------------ | ------------------------------------------------------------------------------- |
| Node.js      | 24.x (mín. 22.12)              |                                                                                 |
| pnpm         | 12.4.2                         | `packageManager` fixado no `package.json`                                       |
| Turborepo    | 2.11.10                        |                                                                                 |
| TypeScript   | 6.0.3                          | O 7.0 já existe, mas `typescript-eslint` e `@nestjs/swagger` ainda exigem < 6.1 |
| React        | 19.3                           | web 19.3.1; mobile 19.3.0 (versão fixada pelo Expo SDK 58)                      |
| Vite         | 8.3.5                          |                                                                                 |
| Tailwind CSS | 4.3.3                          | Configuração via CSS (`@theme`), sem `tailwind.config.js`                       |
| shadcn/ui    | CLI 4.23 (estilo `radix-nova`) | Componentes copiados para `apps/web/src/components/ui`                          |
| React Router | 8.5.1                          |                                                                                 |
| Expo SDK     | 58.0.22                        | Expo Router 58, React Native 0.88.1                                             |
| NestJS       | 12.3.2                         | ESM, Express, testes com Vitest                                                 |
| Swagger      | @nestjs/swagger 12.0.5         |                                                                                 |
| Logs         | nestjs-pino 5.3.1 / pino 10    | JSON em produção, legível em desenvolvimento                                    |
| Prisma       | 7.10.1                         | A tag `latest` do npm aponta para 8.0.0-rc; mantido o 7.x estável               |
| PostgreSQL   | 17 (Docker) / 16+ local        |                                                                                 |
| Zod          | 4.6.7                          |                                                                                 |
| ESLint       | 10.14 + typescript-eslint 8.72 | Flat config compartilhada                                                       |
| Prettier     | 3.9.10                         |                                                                                 |
| Vitest       | 4.1.12                         | Testes da API                                                                   |

## 4. Identidade visual

- Nome oficial: **PILARIS STUDIO**. Símbolo: "P" em degradê azul (`#087FAD`) → turquesa (`#00D5C5`).
- Paleta: azul-marinho `#061B36`, azul profundo `#0B2945`, turquesa `#00D5C5`, azul secundário `#087FAD`, fundo claro `#F7F5EF`, branco `#FFFFFF`, texto `#172536`, texto secundário `#718096`.
- **Fonte única da paleta:** `packages/shared/src/brand/colors.ts`. O web replica os valores em `apps/web/src/styles/tokens.css` (CSS não importa TS); o mobile importa diretamente.
- **Tokens semânticos:** componentes usam `bg-primary`, `text-muted-foreground`, `bg-brand` etc., nunca hex diretos.
- Raio discreto (`--radius: 0.375rem` no web, 4–8 px no mobile), sem gradientes além do símbolo, poucas cores por tela.
- O símbolo atual é uma **reprodução vetorial provisória**. Ao receber os arquivos oficiais da logo, substitua `LogoMark` (web e mobile), `apps/web/public/favicon.svg` e os PNGs em `apps/mobile/assets/images`.

## 5. Segurança

- Segredos apenas em `.env` (ignorado pelo Git). `.env.example` contém somente valores fictícios.
- A API valida todas as variáveis na inicialização e não sobe com configuração inválida.
- Web e mobile só leem variáveis públicas (`VITE_*`, `EXPO_PUBLIC_*`) e têm seus próprios `.env.example`.
- Helmet (cabeçalhos de segurança), CORS restrito a origens configuradas, logs com `authorization` e `cookie` redigidos.
- Erros internos nunca expõem stack trace ao cliente.
- Perfis de acesso (`UserRole`) definidos no banco e em `@pilaris/shared`, vinculados por estúdio (`StudioMembership`). A autenticação JWT + refresh token e os guards por perfil entram na Fase 2.
