const { test, expect } = require("@playwright/test");

test.describe("AutomationExercise Hybrid Performance Tests", () => {
  // Helper Function สำหรับ Login เมื่อจำเป็น
  async function performLogin(page) {
    await page.goto("https://automationexercise.com/login");
    await page.fill('[data-qa="login-email"]', "testeruser123@gmail.com");
    await page.fill('[data-qa="login-password"]', "123456");
    await page.click('[data-qa="login-button"]');
    await expect(page.getByText("Logout")).toBeVisible();
  }

  // --- ส่วนที่ไม่ต้อง Login ---

  // 1. Home Page Load
  test("PERF-01: Home Page initial load speed", async ({ page }) => {
    const start = performance.now();
    await page.goto("https://automationexercise.com/");
    const duration = (performance.now() - start) / 1000;
    console.log(`[PERF-01] Home Load: ${duration.toFixed(2)}s`);
    expect(duration).toBeLessThan(5);
  });

  // 2. Search Response
  test("PERF-02: Product Search response time", async ({ page }) => {
    await page.goto("https://automationexercise.com/products");
    await page.fill("#search_product", "Fancy Green Top");
    const start = performance.now();
    await page.click("#submit_search");
    await page.waitForSelector(".productinfo", { state: "visible" });
    const duration = (performance.now() - start) / 1000;
    console.log(`[PERF-02] Search Response: ${duration.toFixed(2)}s`);
    expect(duration).toBeLessThan(2.5);
  });

  // 3. Product Detail Load
  test("PERF-03: View Product detail response time", async ({ page }) => {
    await page.goto("https://automationexercise.com/products");
    const start = performance.now();
    await page.locator(".choose > .nav > li > a").first().click();
    await page.waitForSelector(".product-information", { state: "visible" });
    const duration = (performance.now() - start) / 1000;
    console.log(`[PERF-03] Product Detail Load: ${duration.toFixed(2)}s`);
    expect(duration).toBeLessThan(2.0);
  });

  // --- ส่วนที่ต้อง Login อัตโนมัติ ---

  // 4. Add to Cart Response
  test("PERF-04: Add to Cart modal response", async ({ page }) => {
    // สั่ง Login ก่อนทำ Action
    await performLogin(page);

    await page.goto("https://automationexercise.com/products");
    const start = performance.now();
    await page.locator(".add-to-cart").first().click();
    await page.waitForSelector("#cartModal", { state: "visible" }); // ปรับ Selector ตามหน้าเว็บจริง
    const duration = (performance.now() - start) / 1000;
    console.log(`[PERF-04] Add to Cart Speed: ${duration.toFixed(2)}s`);
    expect(duration).toBeLessThan(1.5);
  });

  // 5. Checkout Response
  test("PERF-05: Checkout page response time", async ({ page }) => {
    // สั่ง Login ก่อนทำ Action
    await performLogin(page);

    await page.goto("https://automationexercise.com/products");
    await page.locator(".add-to-cart").first().click();
    await page.click('u:has-text("View Cart")');

    const start = performance.now();
    await page.click(".check_out");
    await page.waitForSelector("#address_delivery", { state: "visible" });
    const duration = (performance.now() - start) / 1000;
    console.log(`[PERF-05] Checkout Response Time: ${duration.toFixed(2)}s`);
    expect(duration).toBeLessThan(5);
  });
});
