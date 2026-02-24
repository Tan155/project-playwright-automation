import { test, expect } from '@playwright/test';

test('Add Product', async ({ page }) => {
    await page.goto('https://automationexercise.com/');
    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
    await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('testeruser123@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();
    
    const firstProductCartBtn = page.locator('.productinfo .add-to-cart').first();
    await firstProductCartBtn.click({ force: true });
    
    const modal = page.locator('#cartModal');
    await modal.waitFor({ state: 'visible', timeout: 5000 });
    
    await expect(modal.locator('h4')).toContainText('Added!');
    await page.waitForTimeout(1000); 
    await expect(modal).toContainText('Your product has been added to cart.');
    await page.waitForTimeout(1000);

    const continueBtn = page.getByRole('button', { name: 'Continue Shopping' });
    await page.waitForTimeout(500);
    await expect(continueBtn).toBeVisible();
    await page.waitForTimeout(500);

    // View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    await page.waitForTimeout(500);
    await page.getByText('Proceed To Checkout').click();
    await page.waitForTimeout(500);
    await expect(page.locator('#address_delivery').getByText('Mr. tester user')).toBeVisible();
    await page.locator('#address_delivery').getByText('Bangkok Thailand').click();
    await page.locator('#address_delivery').getByText('- -').click();
    await page.locator('#address_delivery').getByText('Singapore').click();
    await page.locator('#address_delivery').getByText('0123456').click();
    await page.waitForTimeout(500);
    //expect Address
    await expect(page.locator('#address_delivery').getByText('Bangkok Thailand')).toBeVisible();
    await expect(page.locator('#address_delivery').getByText('- -')).toBeVisible();
    await expect(page.locator('#address_delivery').getByText('- -')).toBeVisible();
    await expect(page.locator('#address_delivery').getByText('Singapore')).toBeVisible();
    await expect(page.locator('#address_delivery').getByText('0123456')).toBeVisible();
    await page.waitForTimeout(500);
    await page.getByRole('link', { name: 'Place Order' }).click();
    await page.locator('input[name="name_on_card"]').click();
    await page.locator('input[name="name_on_card"]').fill('tester');
    await page.waitForTimeout(500);
    await page.locator('input[name="card_number"]').click();
    await page.locator('input[name="card_number"]').fill('1234');
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'ex.' }).click();
    await page.getByRole('textbox', { name: 'ex.' }).fill('123');
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'MM' }).click();
    await page.getByRole('textbox', { name: 'MM' }).fill('1');
    await page.waitForTimeout(500);
    await page.getByRole('textbox', { name: 'YYYY' }).click();
    await page.getByRole('textbox', { name: 'YYYY' }).fill('2026');
    await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    await page.waitForTimeout(500);
    //expect Order Placed!
    await expect(page.getByText('Order Placed!')).toBeVisible();
});

test('verify total price', async ({ page }) => {
    await page.goto('https://automationexercise.com/product_details/1');

    const quantityInput = page.locator('#quantity');
    await quantityInput.fill('4');
    await page.waitForTimeout(500);


    await page.getByRole('button', { name: 'Add to cart' }).click();
    await page.waitForTimeout(500);

    await page.locator('#cartModal').waitFor({ state: 'visible' });
    await page.getByRole('link', { name: 'View Cart' }).click();
    await page.waitForTimeout(500);

    const row = page.locator('#product-1');
    await page.waitForTimeout(500);
    const priceText = await row.locator('.cart_price p').innerText();
    const price = parseInt(priceText.replace(/\D/g, ''));

    const quantityText = await row.locator('.cart_quantity button').innerText();
    const quantity = parseInt(quantityText);

    const totalText = await row.locator('.cart_total_price').innerText();
    const total = parseInt(totalText.replace(/\D/g, ''));

    console.log(`Check: The number must be 4.`);
    expect(quantity).toBe(4);

    console.log(`Check price: ${price} x ${quantity} = ${total}`);
    expect(price * quantity).toBe(total);
});