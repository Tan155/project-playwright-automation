import { test, expect } from '@playwright/test';

test('subscription_incorrect_input', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await expect(page).toHaveURL('https://automationexercise.com/');

  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });

  await expect(page.getByRole('textbox', { name: 'Your email address' })).toBeVisible();
  await page.waitForTimeout(1000);
  // test by 'e@'
  await page.getByRole('textbox', { name: 'Your email address' }).fill('e@');
  await page.waitForTimeout(1000);
  await page.locator('#subscribe').click();
  await page.waitForTimeout(1000);
  await expect(page.getByText('You have been successfully subscribed!')).not.toBeVisible();
});


test('subscription_correct_input', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await expect(page).toHaveURL('https://automationexercise.com/');

  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  
  await expect(page.getByRole('textbox', { name: 'Your email address' })).toBeVisible();
  await page.waitForTimeout(1000);
  // test by correct pattern
  await page.getByRole('textbox', { name: 'Your email address' }).fill('e@gmail.com');
  await page.waitForTimeout(1000);
  await page.locator('#subscribe').click();
  
  await expect(page.getByText('You have been successfully subscribed!')).toBeVisible();
  await page.waitForTimeout(1000);
});