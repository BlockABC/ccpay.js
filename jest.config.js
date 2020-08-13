module.exports = {
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'json'
  ],
  'transform': {
    '^.+\\.tsx?$': 'ts-jest'
  },
  'testRegex': './test/.*.spec.ts',
  'collectCoverageFrom': ['{src,test}/**/*.{js,jsx,tsx,ts}', '!**/node_modules/**', '!**/vendor/**'],
  'coverageReporters': ['json', 'lcov'],
  'setupFiles': ['jest-useragent-mock'],
}
