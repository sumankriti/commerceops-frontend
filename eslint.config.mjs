import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      // 'no-console': 'error',
      // 'no-debugger': 'error',
      // eqeqeq: ['error', 'always'],
      // curly: ['error', 'all'],
      // 'no-var': 'error',
      // 'prefer-const': 'error',
      // TypeScript safety
      // '@typescript-eslint/no-explicit-any': 'warn',
      // '@typescript-eslint/no-non-null-assertion': 'warn',
      // '@typescript-eslint/no-unused-vars': 'error',
      // '@typescript-eslint/consistent-type-imports': 'error',
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
