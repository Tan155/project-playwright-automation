import { test, expect } from '@playwright/test';

test('register user', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('tester');
    await page.waitForTimeout(500);
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('testeruser123@gmail.com');
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Signup' }).click();
    await page.getByRole('radio', { name: 'Mr.' }).check();
    await page.getByRole('textbox', { name: 'Password *' }).click();
    await page.getByRole('textbox', { name: 'Password *' }).fill('123456');
    await page.locator('#days').selectOption('1');
    await page.locator('#months').selectOption('1');
    await page.locator('#years').selectOption('2005');
    await page.getByRole('textbox', { name: 'First name *' }).click();
    await page.getByRole('textbox', { name: 'First name *' }).fill('tester');
    await page.getByRole('textbox', { name: 'Last name *' }).click();
    await page.getByRole('textbox', { name: 'Last name *' }).fill('user');
    await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).click();
    await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill('Bangkok Thailand');
    await page.getByLabel('Country *').selectOption('Singapore');
    await page.getByRole('textbox', { name: 'State *' }).click();
    await page.getByRole('textbox', { name: 'State *' }).fill('-');
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
    await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill('-');
    await page.locator('#zipcode').click();
    await page.locator('#zipcode').fill('10110');
    await page.getByRole('textbox', { name: 'Mobile Number *' }).click();
    await page.getByRole('textbox', { name: 'Mobile Number *' }).fill('0123456');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Account Created!')).toBeVisible();
    await expect(page.getByText('Congratulations! Your new')).toBeVisible();
    await expect(page.getByText('You can now take advantage of')).toBeVisible();
});

test('user already exists', async ({ page }) => {
    await page.goto('https://automationexercise.com/login');
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('tester');
    await page.waitForTimeout(500);
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('testeruser123@gmail.com');
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Signup' }).click();
    await page.waitForTimeout(500);
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
});


