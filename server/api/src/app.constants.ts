export const APP_SERVICE_NAME = 'pilaris-api';

/** Versão informada pelo pnpm ao executar scripts; "dev" quando executado diretamente. */
export const APP_VERSION = process.env.npm_package_version ?? 'dev';

/** Prefixo das rotas de negócio. Rotas de saúde ficam fora do prefixo. */
export const API_PREFIX = 'api/v1';
