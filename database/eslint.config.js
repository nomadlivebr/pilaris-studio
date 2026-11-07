import node from '@pilaris/config/eslint/node';

export default [
  ...node,
  {
    files: ['seeds/**/*.ts'],
    rules: { 'no-console': ['error', { allow: ['warn', 'error'] }] },
  },
];
