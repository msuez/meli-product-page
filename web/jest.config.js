const path = require('path');

/** @type {import('jest').Config} */
const config = {
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: [path.resolve(__dirname, 'jest.setup.ts')],
    testPathIgnorePatterns: ['/node_modules/', '/.next/', '/tests/e2e/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

module.exports = config;
