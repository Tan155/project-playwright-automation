import { test, expect } from '@playwright/test';

test('Check Category Brands', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Women' }).click();
  await page.getByRole('link', { name: 'Dress' }).click();
  await expect(page.getByRole('heading', { name: 'Women - Dress Products' })).toBeVisible();
  await page.getByRole('link', { name: ' Women' }).click();
  await page.getByRole('link', { name: 'Tops' }).click();
  await expect(page.getByRole('heading', { name: 'Women - Tops Products' })).toBeVisible();
  await page.getByRole('link', { name: ' Women' }).click();
  await page.getByRole('link', { name: 'Saree' }).click();
  await expect(page.getByRole('heading', { name: 'Women - Saree Products' })).toBeVisible();
  await page.getByRole('link', { name: ' Men' }).click();
  await page.getByRole('link', { name: 'Tshirts' }).click();
  await expect(page.getByRole('heading', { name: 'Men - Tshirts Products' })).toBeVisible();
  await page.getByRole('link', { name: ' Men' }).click();
  await page.getByRole('link', { name: 'Jeans' }).click();
  await expect(page.getByRole('heading', { name: 'Men - Jeans Products' })).toBeVisible();
  await page.getByRole('link', { name: ' Kids' }).click();
  await page.getByRole('link', { name: 'Dress' }).click();
  await expect(page.getByRole('heading', { name: 'Kids - Dress Products' })).toBeVisible();
  await page.getByRole('link', { name: ' Kids' }).click();
  await page.getByRole('link', { name: 'Tops & Shirts' }).click();
  await expect(page.getByRole('heading', { name: 'Kids - Tops & Shirts Products' })).toBeVisible();
  await page.getByRole('link', { name: '(6) Polo' }).click();
  await expect(page.getByRole('heading', { name: 'Brand - Polo Products' })).toBeVisible();
  await page.getByRole('link', { name: '(5) H&M' }).click();
  await expect(page.getByRole('heading', { name: 'Brand - H&M Products' })).toBeVisible();
  await page.getByRole('link', { name: '(5) Madame' }).click();
  await expect(page.getByRole('heading', { name: 'Brand - Madame Products' })).toBeVisible();
  await page.getByRole('link', { name: '(3) Mast & Harbour' }).click();
  await expect(page.getByRole('heading', { name: 'Brand - Mast & Harbour' })).toBeVisible();
  await page.getByRole('link', { name: '(4) Babyhug' }).click();
  await expect(page.getByRole('heading', { name: 'Brand - Babyhug Products' })).toBeVisible();
  await page.getByRole('link', { name: '(3) Allen Solly Junior' }).click();
  await expect(page.getByRole('heading', { name: 'Brand - Allen Solly Junior' })).toBeVisible();
  await page.getByRole('link', { name: '(3) Kookie Kids' }).click();
  await expect(page.getByRole('heading', { name: 'Brand - Kookie Kids Products' })).toBeVisible();
  await page.getByRole('link', { name: '(5) Biba' }).click();
  await expect(page.getByRole('heading', { name: 'Brand - Biba Products' })).toBeVisible();  
});

test('LR carouse', async ({ page }) => {
await page.goto('https://automationexercise.com/');
  await page.goto('https://automationexercise.com/');
  await expect(page.getByRole('img', { name: 'demo website for practice' })).toBeVisible();
  await page.locator('.right').first().click();
  await expect(page.locator('#slider-carousel')).toContainText('AutomationExercise');
  await page.locator('.right').first().click();
  await expect(page.locator('#slider-carousel')).toContainText('All QA engineers can use this website for automation practice and API testing either they are at beginner or advance level. This is for everybody to help them brush up their automation skills.');
  await page.locator('.right').first().click();
});

test('Check Cart', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.locator('.product-overlay').first().click();
  await page.getByText('Add to cart').nth(1).click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.locator('.cart_quantity_delete').click();
  await expect(page.locator('#empty_cart')).toContainText('Cart is empty! Click here to buy products.');
});