import {defineConfig, globalIgnores} from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    rules: {
      // Enforce explicit return types on all functions (Google TS guide)
      '@typescript-eslint/explicit-function-return-type': 'error',

      // Ban implicit any types
      '@typescript-eslint/no-explicit-any': 'error',

      // Enforce import type for type-only imports
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {prefer: 'type-imports', fixStyle: 'separate-type-imports'},
      ],

      // Disallow unused variables
      '@typescript-eslint/no-unused-vars': [
        'error',
        {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
      ],

      // Prefer const for variables that are never reassigned
      'prefer-const': 'error',

      // No var declarations
      'no-var': 'error',
    },
  },
]);

export default eslintConfig;
