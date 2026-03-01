import { test, expect } from '@playwright/test';

test('TC6: Register -> Login -> Delete account -> Login should fail (account not found)', async ({ page }) => {
  test.setTimeout(90000);

  const email = `test${Date.now()}@mail.com`;
  const password = '123456';

  // 1) เข้าเว็บ
  await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });

  // 2) ไปหน้า Login/Signup
  await page.click('a[href="/login"]');
  await expect(page).toHaveURL(/\/login/);

  // 3) ลงทะเบียน (Signup)
  await page.fill('input[data-qa="signup-name"]', 'Test User');
  await page.fill('input[data-qa="signup-email"]', email);
  await page.click('button[data-qa="signup-button"]');

  // 4) กรอกข้อมูลสมัคร (Enter Account Information)
  await expect(page.getByRole('heading', { name: /enter account information/i })).toBeVisible({ timeout: 20000 });

  await page.check('#id_gender1');
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
  await page.fill('#zipcode', '10110');
  await page.fill('#mobile_number', '0123456789');

  await page.click('button[data-qa="create-account"]');

  // 5) ยืนยัน Account Created แล้วกด Continue
  await expect(page.getByRole('heading', { name: /account created!/i })).toBeVisible({ timeout: 20000 });
  await page.click('[data-qa="continue-button"]');

  // 6) เช็คว่า Login แล้ว (Logged in as)
  await expect(page.getByText(/logged in as/i)).toBeVisible({ timeout: 20000 });

  // 7) Logout
  await page.click('a[href="/logout"]');
  await expect(page).toHaveURL(/\/login/);

  // 8) Login ด้วย account ที่เพิ่งสมัคร (ยืนยันว่าเข้าได้จริง)
  await page.fill('input[data-qa="login-email"]', email);
  await page.fill('input[data-qa="login-password"]', password);
  await page.click('button[data-qa="login-button"]');
  await expect(page.getByText(/logged in as/i)).toBeVisible({ timeout: 20000 });

  // 9) ลบแอค
  await page.click('a[href="/delete_account"]');
  await expect(page.getByRole('heading', { name: /account deleted!/i })).toBeVisible({ timeout: 20000 });
  await page.click('[data-qa="continue-button"]');

  // 10) กลับไปหน้า Login แล้วลอง Login อีกครั้ง -> ต้องไม่พบแอค (เข้าไม่ได้)
  await page.click('a[href="/login"]');
  await expect(page).toHaveURL(/\/login/);

  await page.fill('input[data-qa="login-email"]', email);
  await page.fill('input[data-qa="login-password"]', password);
  await page.click('button[data-qa="login-button"]');

  // automationexercise ปกติจะขึ้นข้อความนี้เมื่อ login ไม่ได้
  await expect(page.getByText(/your email or password is incorrect!/i)).toBeVisible({ timeout: 20000 });
});