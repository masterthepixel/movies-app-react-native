module.exports = {
  root: true,
  extends: ['@react-native-community'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
      },
    },
  ],
};
