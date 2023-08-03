const { defaults } = require('jest-config');

module.exports = {
  moduleNameMapper: {
    '\\.svg$': './tests/fileMock.js',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
