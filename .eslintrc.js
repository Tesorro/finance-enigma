module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:i18next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'react-hooks',
    'finance-enigma-plugin',
    'unused-imports',
  ],
  rules: {
    'func-names': 'off',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'react/no-unused-prop-types': 'warn',
    'react/self-closing-comp': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    indent: [2, 2],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    // 'no-unused-vars': 'warn',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    // 'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'react/prop-types': 'off',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'path'] }],
    // 'i18next/no-literal-string': [
    //   'error',
    //   {
    //     markupOnly: true,
    //     ignoreAttribute: ['data-testid', 'to'],
    //   },
    // ],
    'max-len': ['error', { ignoreComments: true, code: 200 }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-params-reassign': 'off',
    'i18next/no-literal-string': 'off',
    'no-undef': 'off',
    'react/no-array-index-key': 'off',
    'finance-enigma-plugin/path-checker': ['error', {
      alias: '@',
    }],
    'finance-enigma-plugin/public-api-imports': ['error', {
      alias: '@',
    }],
    'finance-enigma-plugin/layer-imports': ['error', {
      alias: '@',
      ignoreImportPatterns: ['**/StoreProvider'],
    }],
    'no-console': 'off',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: './**.module.*',
            group: 'internal',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.test.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
      },
    },
  ],
};
