import { test, expect } from '@playwright/test';

test('TC13: Search special characters and expect no products', async ({ page }) => {
  test.setTimeout(60000);

  const keyword = '!@#$%^&*';

  // เข้าเว็บ
  await page.goto('https://automationexercise.com/', {
    waitUntil: 'domcontentloaded'
  });

  // ไปหน้า Products
  await page.click('a[href="/products"]');
  await expect(page).toHaveURL(/\/products/);

  // รอหน้าโหลด
  await expect(
    page.getByRole('heading', { name: /all products/i })
  ).toBeVisible();

  // ค้นหาด้วยอักษรพิเศษ
  await page.fill('#search_product', keyword);
  await page.click('#submit_search');

  // ต้องขึ้น SEARCHED PRODUCTS
  await expect(
    page.getByRole('heading', { name: /searched products/i })
  ).toBeVisible();

  // 🔥 จุดสำคัญ: ต้องไม่มีสินค้าแสดง
  const products = page.locator('.product-image-wrapper');

  await expect(products).toHaveCount(0);
});