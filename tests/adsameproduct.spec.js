const { test, expect } = require('@playwright/test');

test('TC11: Add same product multiple times', async ({ page }) => {

  await page.goto('https://automationexercise.com/', {
    waitUntil: 'domcontentloaded'
  });

  await page.click('a[href="/products"]');
  await expect(page.locator('text=All Products')).toBeVisible();

  // เลือกปุ่ม Add to cart ตัวแรกโดยตรง
  const addButton = page.locator('a.add-to-cart[data-product-id]').first();
  const productId = await addButton.getAttribute('data-product-id');

  // ===== ครั้งที่ 1 =====
  await addButton.click();
  await expect(page.locator('#cartModal')).toBeVisible();
  await page.click('button:has-text("Continue Shopping")');
  await expect(page.locator('#cartModal')).toBeHidden();

  // ===== ครั้งที่ 2 =====
  await page.locator('a.add-to-cart[data-product-id]').first().click();
  await expect(page.locator('#cartModal')).toBeVisible();
  await page.click('a:has-text("View Cart")');

  await expect(page).toHaveURL(/view_cart/);

  // ตรวจสอบ quantity = 2
  const row = page.locator(
    `tr:has(a.cart_quantity_delete[data-product-id="${productId}"])`
  );

  await expect(row.locator('.cart_quantity button')).toHaveText('2');

});