module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'import/prefer-default-export': 0,
    'import/no-unresolved': 0,
    'no-unused-vars': [
      2,
      { "argsIgnorePattern": "type" } 
    ],
    '@typescript-eslint/no-unused-vars': [
      2,
      { "argsIgnorePattern": "type" }
    ],
    "@typescript-eslint/explicit-function-return-type": 0
  }
};
