export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.test.json',
        isolatedModules: true,
      },
    ],
  },
  moduleNameMapper: {
    '\\.svg\\?react$': '<rootDir>/src/__mocks__/svgMock.tsx',
    '\\.(svg|png|jpg|jpeg|gif|webp)$': '<rootDir>/src/__mocks__/fileMock.ts',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
};
