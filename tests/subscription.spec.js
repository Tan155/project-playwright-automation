import { test, expect } from '@playwright/test';

test('subscription', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight - 1000) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Your email address' }).click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Your email address' }).fill('e');
  await page.waitForTimeout(2000);
  await page.locator('#subscribe').click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Your email address' }).fill('e@');
  await page.waitForTimeout(2000);
  await page.locator('#subscribe').click();
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Your email address' }).fill('e@gmail.com');
  await page.waitForTimeout(2000);
  await page.locator('#subscribe').click();
  await page.waitForTimeout(2000);
});