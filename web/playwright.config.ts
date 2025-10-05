import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    testMatch: ['**/*.spec.{ts,tsx}'],
    timeout: 60 * 1000,
    retries: 0,
    use: {
        baseURL: 'http://localhost:3000',
        headless: true,
        viewport: { width: 1280, height: 800 },
        trace: 'on-first-retry',
    },

    webServer: [
        {
            command: 'npm run dev',
            cwd: '../api',
            url: 'http://localhost:4000/ping',
            reuseExistingServer: !process.env.CI,
            timeout: 120 * 1000,
            env: {
                PORT: '4000',
                NODE_ENV: 'test',
            },
        },
        {
            command: 'PORT=3000 npm run dev',
            url: 'http://localhost:3000',
            reuseExistingServer: !process.env.CI,
            timeout: 120 * 1000,
        },
    ],

    projects: [
        {
            name: 'Desktop Chrome',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 14'] },
        },
    ],
});
