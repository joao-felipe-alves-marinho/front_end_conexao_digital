import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin'; // TypeScript ESLint plugin
import tsParser from '@typescript-eslint/parser'; // TypeScript parser
import react from 'eslint-plugin-react';

export default [
  {
    ignores: ['dist'], // Ignore dist folder
  },
  {
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript 2020
      globals: globals.browser, // Use browser globals
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'], // TS config files
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint, // Add TypeScript ESLint plugin
    },
    rules: {
      // Recommended rules from the plugins
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      '@typescript-eslint/indent': ['error', 4],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
];
