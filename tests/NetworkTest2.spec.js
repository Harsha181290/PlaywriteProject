const { test ,expect} = require('@playwright/test');

test('Secuirty Test Intercept', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill('harsha935383@gmail.com');
    await page.locator("#userPassword").fill('Harsha@2025');
    await page.locator("#login").click();
     await page.waitForResponse(response =>
        response.url().includes("/api/ecom/auth/login") &&
        response.status() === 200
    );
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",

        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69590083c941646b7a7a11ee' })
    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

}
);