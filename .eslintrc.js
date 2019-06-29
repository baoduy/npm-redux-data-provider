module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    jest: true
  },
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    legacyDecorators: true,
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    }
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    indent: 'off',
    'linebreak-style': ['off', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': 'off',
    experimentalDecorators: true,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
