module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },

  // base shareable configs
  extends: [
    'eslint:recommended',
    'plugin:security/recommended'
  ],

  plugins: [
    'security'
  ],

  rules: {
    // you can tweak these as you go
    'security/detect-eval-with-expression': 'error',
    // e.g. warn on console.log in production
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
};
