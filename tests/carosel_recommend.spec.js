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
        if (totalHeight >= document.body.scrollHeight - 1200) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });

  await page.waitForTimeout(1000);
  await expect(page.locator('#recommended-item-carousel').getByText('Stylish Dress')).toBeVisible(); //check carosel is default (stylist dress)


  await page.locator('.right.recommended-item-control').click();
  await page.waitForTimeout(1000);
  await expect(page.locator('#recommended-item-carousel').getByText('Blue Top')).toBeVisible(); //check carosel move to blue top

  // กดซ้าย 1 ครั้ง
  await page.locator('.left.recommended-item-control').click();
  await page.waitForTimeout(1000);
  await expect(page.locator('#recommended-item-carousel').getByText('Stylish Dress')).toBeVisible(); //check carosel back to stylish dress
});