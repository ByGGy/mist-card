import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'

export default [
  {
    ignores: ['dist/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'semi': ['error', 'never'],
      'import/first': ['error'],
    },
  },
]
