const { test, expect } = require('@playwright/test');

test('TC12: Checkout แล้วกรอกข้อมูลบัตรผิด', async ({ page }) => {

  test.setTimeout(90000);

  const email = `test${Date.now()}@mail.com`;
  const password = '123456';

  // ===== สมัคร + login =====
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
  await page.click('a[href="/login"]');

  await page.fill('input[data-qa="signup-name"]', 'Test User');
  await page.fill('input[data-qa="signup-email"]', email);
  await page.click('button[data-qa="signup-button"]');

  await page.fill('#password', password);
  await page.selectOption('#days', '1');
  await page.selectOption('#months', '1');
  await page.selectOption('#years', '2000');

  await page.fill('#first_name', 'Test');
  await page.fill('#last_name', 'User');
  await page.fill('#address1', 'Bangkok');
  await page.selectOption('#country', 'India');
  await page.fill('#state', 'State');
  await page.fill('#city', 'City');
  await page.fill('#zipcode', '12345');
  await page.fill('#mobile_number', '0123456789');

  await page.click('button[data-qa="create-account"]');
  await page.waitForSelector('text=Account Created!');
  await page.click('a[data-qa="continue-button"]');

  await expect(page.locator('text=Logged in as')).toBeVisible();

  // ===== Add สินค้า =====
  await page.click('a[href="/products"]');
  await page.locator('a.add-to-cart[data-product-id]').first().click();

  await page.click('a:has-text("View Cart")');
  await expect(page).toHaveURL(/view_cart/);

  // ===== Checkout =====
  await page.click('a:has-text("Proceed To Checkout")');

  await page.fill('textarea[name="message"]', 'Test order');
  await page.click('a:has-text("Place Order")');

  // ===== อยู่หน้า Payment =====
  await expect(
  page.getByRole('heading', { name: 'Payment' })
).toBeVisible({ timeout: 15000 });

  // ===== กรอกข้อมูลบัตรผิด =====
  await page.fill('input[name="name_on_card"]', 'Test User');
  await page.fill('input[name="card_number"]', '123');
  await page.fill('input[name="cvc"]', '1');
  await page.fill('input[name="expiry_month"]', '0');
  await page.fill('input[name="expiry_year"]', '20');

  await page.click('button:has-text("Pay and Confirm Order")');

  // ===== ต้องไม่สำเร็จ =====
  await expect(
    page.locator('text=Your order has been placed successfully!')
  ).not.toBeVisible();

});