import node from '@pilaris/config/eslint/node';

export default [
  ...node,
  {
    files: ['**/*.spec.ts', 'test/**/*.ts'],
    rules: { '@typescript-eslint/no-explicit-any': 'off' },
  },
];
