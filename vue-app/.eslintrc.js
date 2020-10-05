module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    '@vue/airbnb',
    'plugin:vue/vue3-essential',
    '@vue/prettier',
    '@vue/typescript',
  ],
  plugins: ['prettier'],

  // watch this for explaining why some of this is here
  // https://www.youtube.com/watch?time_continue=239&v=YIvjKId9m2c
  rules: {
    'no-console': 'off', // process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'consistent-return': 0,
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'max-classes-per-file': 'off',
    'no-unused-vars': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-unused-vars': ['error'],
    'lines-between-class-members': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'all',
        singleQuote: true,
        printWidth: 80,
      },
    ],
    'vue/no-unused-components': [
      'error',
      {
        ignoreWhenBindingPresent: true,
      },
    ],
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
