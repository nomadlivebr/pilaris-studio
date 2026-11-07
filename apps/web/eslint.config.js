import react from '@pilaris/config/eslint/react';

export default [
  ...react,
  {
    // Componentes gerados pelo shadcn/ui exportam variantes junto dos componentes.
    files: ['src/components/ui/**/*.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
];
