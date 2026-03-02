import { test, expect } from '@playwright/test';

test('review', async ({ page }) => {
     async function scrollToBottom(page) {
          await page.evaluate(async () => {
          await new Promise((resolve) => {
               let totalHeight = 0;
               const distance = 100;
               const endAt = 500;
               const timer = setInterval(() => {
               window.scrollBy(0, distance);
               totalHeight += distance;
               if (totalHeight >= endAt) {
                    clearInterval(timer);
                    resolve();
               }
               }, 100);
          });
          });
     }
     await page.goto('https://automationexercise.com/');
     await expect(page).toHaveURL('https://automationexercise.com/');

     await page.getByRole('link', { name: ' Contact us' }).click();
     await expect(page).toHaveURL('https://automationexercise.com/contact_us');

     await page.waitForTimeout(1000);
     await scrollToBottom(page);
     await page.waitForTimeout(1000);

     //test email validation(@)
     await page.getByRole('textbox', { name: 'Email', exact: true }).fill('d');
     await page.getByRole('button', { name: 'Submit' }).click();
     await page.waitForTimeout(1000);

     await page.getByRole('textbox', { name: 'Email', exact: true }).fill('d@');
     await page.getByRole('button', { name: 'Submit' }).click();
     await page.waitForTimeout(1000);

     //pass test
     await page.getByRole('textbox', { name: 'Name' }).fill('nick');
     await page.getByRole('textbox', { name: 'Email', exact: true }).fill('d@gmail.com');
     await page.getByRole('textbox', { name: 'Subject' }).fill('Store');
     await page.getByRole('textbox', { name: 'Your Message Here' }).fill('I\'ve been shopping on this site for a few months now and I\'m consistently impressed. The fabric quality is excellent, the sizing guide is accurate, and the packaging is really neat. Customer service was super responsive when I had a question about my order. Highly recommend to anyone looking for stylish yet affordable clothing!');
     await page.waitForTimeout(1000);

     page.once('dialog', dialog => {
          console.log(`Dialog message: ${dialog.message()}`);
          dialog.accept().catch(() => {}); 
     });
     await page.getByRole('button', { name: 'Submit' }).click();
     await page.waitForTimeout(1000);

     //submit check
     await expect(page.getByText('Success! Your details have been submitted successfully.').first()).toBeVisible();

     await page.locator('a.btn.btn-success').click();
     await page.waitForTimeout(1000);

     //check go to main
     await expect(page).toHaveURL('https://automationexercise.com/');
});