module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['plugin:@typescript-eslint/recommended', 'airbnb-typescript', 'airbnb/hooks'],
  parserOptions: {
    project: `./tsconfig.json`,
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  rules: {
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['draft'] }],
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-empty-function': 'off',
    'react/require-default-props': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/display-name': 'off',
    'import/prefer-default-export': 'off',
    'global-require': 'off',
    'react/prop-types': 'off',
    'object-curly-newline': ['error', { consistent: true }],
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    'react/jsx-props-no-spreading': 'off',
    'no-multiple-empty-lines': [1, { max: 2 }],
    'linebreak-style': 0,
    '@typescript-eslint/naming-convention': [
      1,
      {
        selector: 'variable',
        format: ['PascalCase', 'UPPER_CASE', 'camelCase'],
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    'arrow-parens': [1, 'as-needed'],
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts', '.svg', '.json'],
        paths: ['src'],
      },
    },
  },
};
