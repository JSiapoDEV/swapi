/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^aws-sdk$': '<rootDir>/__mocks__/aws-sdk.ts',
    '^@domain/(.*)$': '<rootDir>/domain/$1',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@functions/(.*)$': '<rootDir>/functions/$1',
    '^@helpers/(.*)$': '<rootDir>/helpers/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
};
