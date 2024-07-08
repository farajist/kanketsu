/** @type {import('ts-jest').JestConfigWithTsJest} */
const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest', 
      { tsconfig: 'tsconfig.json' }
    ]
  },
  moduleFileExtensions: ['ts', 'js'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.(ts|js)'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};
