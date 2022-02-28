module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: [
    'ts',
    'js',
  ],
  roots: ['<rootDir>/src/'],
  testMatch: [
    '**/*.test.(ts|js)',
  ],
};
