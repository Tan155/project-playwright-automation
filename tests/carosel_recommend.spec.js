import { test, expect } from '@playwright/test';

test('carosel_recommend', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 200;
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
  await page.locator('.right.recommended-item-control').click();
  await page.waitForTimeout(1000);
  await page.locator('.right.recommended-item-control').click();
  await page.waitForTimeout(1000);
  await page.locator('.right.recommended-item-control').click();
  await page.waitForTimeout(1000);
  await page.locator('.left.recommended-item-control').click();
  await page.waitForTimeout(1000);
  await page.locator('.left.recommended-item-control').click();
  await page.waitForTimeout(1000);
  await page.locator('.left.recommended-item-control').click();
});