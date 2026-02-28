import { test, expect } from '@playwright/test';

test('scroll_up', async ({ page }) => {
  async function scrollToBottom(page, distance = 500) { // 500 คือค่า default
    await page.evaluate(async (distance) => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    }, distance); // ส่งค่า distance เข้าไปใน evaluate ด้วย
  }

  //1)main page
  await page.goto('https://automationexercise.com/');
  await scrollToBottom(page);
  await page.waitForTimeout(500);
  await page.locator('#scrollUp').click();
  await page.waitForTimeout(500);

  //4)signin-login page
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await scrollToBottom(page,100);
    await page.waitForTimeout(500);
    await page.locator('#scrollUp').click();
    await page.waitForTimeout(500);

  //2)product page
  await page.getByRole('link', { name: ' Products' }).click();
  await scrollToBottom(page);
  await page.waitForTimeout(500);
  await page.locator('#scrollUp').click();
  await page.waitForTimeout(500);
  

  //5)test case page
    await page.getByRole('link', { name: ' Test Cases' }).click();
    await scrollToBottom(page);
    await page.waitForTimeout(500);
    await page.locator('#scrollUp').click();
    await page.waitForTimeout(500);


    //7)contact page 
    await page.getByRole('link', { name: ' Contact us' }).click();
    await scrollToBottom(page,50);
    await page.waitForTimeout(500);
    await page.locator('#scrollUp').click();
    await page.waitForTimeout(500);

  //6)api test page
    await page.getByRole('link', { name: ' API Testing' }).click();
    await scrollToBottom(page);
    await page.waitForTimeout(500);
    await page.locator('#scrollUp').click();
    await page.waitForTimeout(500);

});