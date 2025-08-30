import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';

export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
	},
	{
		ignores: ['dist', 'node_modules', '*.js'],
	},
	{
		files: ['src/**/*.{ts,tsx}'],
		rules: {
			'import/order': 'off',
			'sort-imports': 'off',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
			'@typescript-eslint/array-type': [
				'error',
				{
					default: 'array',
					readonly: 'array',
				},
			],
			'no-restricted-imports': [
				'error',
				{
					patterns: ['../../*'],
				},
			],
			'import/consistent-type-specifier-style': 'off',
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'typeLike',
					format: ['PascalCase'],
				},
				{
					selector: 'variable',
					format: ['camelCase'],
					leadingUnderscore: 'allow',
				},
				{
					selector: 'variable',
					modifiers: ['const'],
					format: ['UPPER_CASE', 'camelCase'],
					leadingUnderscore: 'allow',
				},
				{
					selector: 'parameter',
					format: ['camelCase'],
					leadingUnderscore: 'allow',
				},
				{
					selector: 'function',
					format: ['camelCase', 'PascalCase'],
				},
			],
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
			'prefer-arrow-callback': 'error',
			'no-restricted-imports': [
				'error',
				{
					patterns: ['../../../*'],
				},
			],
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'typeLike',
					format: ['PascalCase'],
				},
				{
					selector: 'variable',
					format: ['camelCase', 'PascalCase'],
					leadingUnderscore: 'allow',
				},
				{
					selector: 'parameter',
					format: ['camelCase'],
					leadingUnderscore: 'allow',
				},
				{
					selector: 'function',
					format: ['camelCase', 'PascalCase'],
				},
				{
					selector: 'variable',
					modifiers: ['const'],
					format: ['UPPER_CASE', 'PascalCase', 'camelCase'],
					leadingUnderscore: 'allow',
				},
			],
		},
	},
]);
