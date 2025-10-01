const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/tests/**/*.test.ts"],
    moduleFileExtensions: ["ts", "js", "json", "node"],
    coverageDirectory: "coverage",
    collectCoverageFrom: ["src/**/*.ts", "!src/**/index.ts", "!src/config/**"],
    transform: {
        "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.test.json" }]
    },
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    setupFiles: ["<rootDir>/jest.setup.js"],
};
