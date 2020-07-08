module.exports = {
  root: true,
  extends: [
    'blockabc/typescript'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/camelcase': [0], // disable this rule for unknown reason
    '@typescript-eslint/explicit-function-return-type': [1], // downgrade level
    '@typescript-eslint/brace-style': [2, 'stroustrup'], // as per brace-style
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
    '@typescript-eslint/strict-boolean-expressions': [0], // too strict, we use if (someVar) everyday
    '@typescript-eslint/restrict-template-expressions': [2, {
      allowAny: true,
    }],
    '@typescript-eslint/no-dynamic-delete': [0], // you should be aware what you will delete
    '@typescript-eslint/promise-function-async': [0], // no need to enforce async
  },
}
