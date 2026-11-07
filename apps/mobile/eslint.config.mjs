import react from '@pilaris/config/eslint/react';

export default [
  ...react,
  {
    ignores: ['.expo/**', 'expo-env.d.ts', 'android/**', 'ios/**'],
  },
  {
    // Rotas do Expo Router exigem export default.
    files: ['src/app/**/*.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
];
