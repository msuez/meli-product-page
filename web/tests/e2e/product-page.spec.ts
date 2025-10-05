import { test, expect } from '@playwright/test';

test.describe('Product Page', () => {
    test('renders product desktop layout correctly', async ({ page }) => {
        await page.goto('http://localhost:3000/celulares/p/a55-5g');

        await page.waitForSelector('[data-testid="loading-state"]', { state: 'detached', timeout: 20000 });

        await page.waitForSelector('[data-testid="product-title"]', { timeout: 10000 });

        await expect(page.getByTestId('product-title')).toBeVisible();
        await expect(page.getByTestId('product-price')).toBeVisible();
        await expect(page.getByText(/Comprar ahora/i)).toBeVisible();
    });

    test('switches to mobile layout correctly', async ({ page }) => {
        await page.setViewportSize({ width: 500, height: 900 });
        await page.goto('http://localhost:3000/celulares/p/a55-5g');

        await page.waitForSelector('[data-testid="loading-state"]', { state: 'detached', timeout: 20000 });
        await page.waitForSelector('[data-testid="product-title"]', { timeout: 10000 });

        await expect(page.getByTestId('product-title')).toBeVisible();
        await expect(page.getByText(/10% OFF OCA Blue Visa/i)).toBeVisible();
    });
});
