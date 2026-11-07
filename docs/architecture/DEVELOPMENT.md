# Guia de desenvolvimento (Windows / PowerShell)

Todos os comandos abaixo são para **PowerShell**, executados na raiz do repositório, salvo indicação.

## 1. Pré-requisitos

| Ferramenta | Versão                                         | Instalação                                       |
| ---------- | ---------------------------------------------- | ------------------------------------------------ |
| Node.js    | 22.12+ (recomendado 24 LTS)                    | `winget install OpenJS.NodeJS.LTS`               |
| pnpm       | 12.x                                           | `npm install -g pnpm@12` (ou `corepack enable`)  |
| Git        | 2.4x+                                          | `winget install Git.Git`                         |
| PostgreSQL | Docker Desktop **ou** PostgreSQL 16+ instalado | `winget install Docker.DockerDesktop`            |
| Expo Go    | última versão                                  | App Store / Google Play (para testar no celular) |

Verifique:

```powershell
node -v
pnpm -v
git --version
docker --version   # se usar Docker
```

> Se o PowerShell bloquear scripts (`pnpm.ps1 não pode ser carregado`), execute uma vez:
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

## 2. Instalar dependências

```powershell
pnpm install
```

O pnpm 12 só executa scripts de instalação dos pacotes autorizados em `pnpm-workspace.yaml` (`allowBuilds`: Prisma e esbuild). Se um novo pacote precisar de build script, o install avisa; revise e adicione-o à lista.

Opcional — desativar a telemetria anônima do Turborepo: `pnpm turbo telemetry disable`.

## 3. Variáveis de ambiente

```powershell
Copy-Item .env.example .env
Copy-Item apps\web\.env.example apps\web\.env         # opcional (padrão: http://localhost:3333)
Copy-Item apps\mobile\.env.example apps\mobile\.env   # opcional
```

Edite `.env` com as credenciais do PostgreSQL. **Nunca versione arquivos `.env`.**

## 4. Iniciar o PostgreSQL

**Opção A — Docker Desktop**

```powershell
pnpm db:up                       # sobe o container (porta 5433)
docker compose ps                # STATUS deve ficar "healthy"
docker compose logs -f postgres  # logs
pnpm db:down                     # para (os dados ficam no volume)
```

**Opção B — PostgreSQL instalado no Windows**

```powershell
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -h localhost -p 5432 `
  -v app_password="'SUA_SENHA'" -f database/scripts/create-local-database.sql
```

No `.env`, use a porta 5432: `DATABASE_URL=postgresql://pilaris:SUA_SENHA@localhost:5432/pilaris_studio?schema=public`.

## 5. Executar as migrations

```powershell
pnpm db:migrate     # aplica as migrations existentes e cria novas se o schema mudou
pnpm db:seed        # opcional: estúdio de demonstração
pnpm db:studio      # opcional: navegar nos dados em http://localhost:5555
```

Detalhes em [DATABASE.md](DATABASE.md).

## 6. Executar o backend

```powershell
pnpm dev:api
```

- API: http://localhost:3333
- Saúde: http://localhost:3333/health e http://localhost:3333/health/database
- Swagger: http://localhost:3333/docs

Produção local: `pnpm --filter @pilaris/api build` e depois `pnpm --filter @pilaris/api start:prod`.

## 7. Executar o painel web

```powershell
pnpm dev:web          # somente o painel
pnpm dev              # API + painel juntos
```

Acesse http://localhost:5173. O quadro "Status do sistema" consulta a API em tempo real.

Build de produção: `pnpm --filter @pilaris/web build` (saída em `apps/web/dist`).

### Adicionar componentes shadcn/ui

```powershell
cd apps\web
pnpm dlx shadcn@4.23.0 add dialog
```

Os componentes são copiados para `src/components/ui` e já usam os tokens de `src/styles/tokens.css`.

## 8. Executar o aplicativo (Expo)

```powershell
pnpm dev:mobile
```

- **Celular físico:** instale o Expo Go e leia o QR code exibido no terminal (celular e computador na mesma rede Wi-Fi). Se a rede bloquear, use `pnpm --filter @pilaris/mobile exec expo start --tunnel`.
- **Emulador Android:** com o Android Studio instalado e um emulador aberto, pressione `a` no terminal do Expo.
- **Navegador:** pressione `w` (útil para conferir layout).
- **iOS:** pelo Expo Go num iPhone; o simulador iOS exige macOS e não é necessário.

Diagnóstico: `pnpm --filter @pilaris/mobile doctor`.

Para adicionar bibliotecas nativas, use sempre o instalador do Expo (garante versões compatíveis com o SDK):

```powershell
cd apps\mobile
pnpm exec expo install nome-da-biblioteca
```

> Para acessar a API a partir de um celular físico, `localhost` não funciona: defina `EXPO_PUBLIC_API_URL=http://SEU_IP:3333` em `apps/mobile/.env` e inclua a origem em `CORS_ORIGINS` se usar o app web do Expo.

## 9. Qualidade

```powershell
pnpm typecheck
pnpm lint
pnpm test
pnpm --filter @pilaris/api test:e2e
pnpm format
```

## 10. Builds Android e iOS (EAS Build — sem Mac)

O EAS Build compila os aplicativos nos servidores da Expo; não é preciso Mac nem Android Studio local.

Identificadores configurados em `apps/mobile/app.json`:

| Plataforma                   | Identificador           |
| ---------------------------- | ----------------------- |
| Android (`android.package`)  | `com.pilarisstudio.app` |
| iOS (`ios.bundleIdentifier`) | `com.pilarisstudio.app` |

> Confirme os identificadores antes do primeiro build de loja: depois de publicados, não podem ser alterados.

Perfis em `apps/mobile/eas.json`:

| Perfil        | Uso                                                                             |
| ------------- | ------------------------------------------------------------------------------- |
| `development` | Development build (cliente de desenvolvimento com bibliotecas nativas próprias) |
| `preview`     | Distribuição interna (APK no Android, ad hoc no iOS)                            |
| `production`  | Lojas (AAB no Android, IPA no iOS), com incremento automático de versão         |

Passo a passo (uma única vez):

```powershell
cd apps\mobile
pnpm dlx eas-cli login              # conta Expo (gratuita)
pnpm dlx eas-cli init               # vincula o projeto e grava o projectId no app.json
```

Builds:

```powershell
pnpm dlx eas-cli build --platform android --profile preview      # APK para testes
pnpm dlx eas-cli build --platform android --profile production   # AAB para a Play Store
pnpm dlx eas-cli build --platform ios --profile production       # IPA para a App Store
```

Requisitos externos:

- **Android:** conta Google Play Console para publicar. O EAS gera e guarda a keystore automaticamente.
- **iOS:** conta Apple Developer (paga). Durante o primeiro build, o EAS cria certificados e perfis de provisionamento usando o login Apple — tudo pela linha de comando no Windows.
- Envio às lojas: `pnpm dlx eas-cli submit --platform android|ios`.

## 11. Git

```powershell
git init
git add .
git commit -m "chore: fase 1 - fundação do Pilaris Studio"
```

O `.gitignore` já exclui `node_modules`, `dist`, `.env`, cliente Prisma gerado, pastas nativas geradas (`android/`, `ios/`) e credenciais de assinatura.

## 12. Problemas comuns

| Sintoma                                          | Solução                                                                      |
| ------------------------------------------------ | ---------------------------------------------------------------------------- |
| `Variáveis de ambiente inválidas` ao subir a API | Confira o `.env` na raiz (principalmente `DATABASE_URL`).                    |
| `/health/database` retorna 503                   | PostgreSQL parado, porta errada ou credenciais incorretas no `DATABASE_URL`. |
| Porta 5432 ocupada pelo Docker                   | Já tratado: o compose usa 5433. Altere `POSTGRES_PORT` se necessário.        |
| Painel mostra API "Indisponível"                 | API parada ou `CORS_ORIGINS` sem `http://localhost:5173`.                    |
| Expo não conecta no celular                      | Mesma rede Wi-Fi, firewall do Windows liberando o Node, ou `--tunnel`.       |
| Erro de tipos após mudar o schema Prisma         | `pnpm db:generate` (ou `pnpm build`).                                        |
