module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  globals: {
    "LoadJs": "writable"
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: [1, "single"],
    'semi': 0,
    'object-curly-spacing': [1, 'never'],
    'dot-notation': 0,
    'indent': 0,
    'space-before-function-paren': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
