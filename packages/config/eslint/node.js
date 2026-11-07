import globals from 'globals';
import tseslint from 'typescript-eslint';

import base from './base.js';

/** Configuração para projetos Node.js (API, serviços e integrações). */
export default tseslint.config(...base, {
  languageOptions: {
    globals: { ...globals.node },
  },
  rules: {
    // Decorators do NestJS dependem de imports de valor para emitir metadados.
    '@typescript-eslint/consistent-type-imports': 'off',
    'no-console': 'error',
  },
});
