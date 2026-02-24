import { test, expect } from '@playwright/test';

test('Logo Home', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');
    await page.getByRole('link', { name: 'Website for automation' }).click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL('https://automationexercise.com/');
});