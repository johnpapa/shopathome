module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['@vue/airbnb', 'plugin:vue/essential', '@vue/prettier'],
  plugins: ['prettier'],
  // watch this for explaining why some of this is here
  // https://www.youtube.com/watch?time_continue=239&v=YIvjKId9m2c
  rules: {
    'no-console': 'off', // process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'consistent-return': 0,
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
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
    'vuejs-accessibility/label-has-for': 'off',
    'vue/multi-word-component-names':'off',
    'no-restricted-exports': 'off',
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
};
