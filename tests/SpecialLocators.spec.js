const { test, expect } = require('@playwright/test');
test("PlayWright Special Locators", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.locator(".ng-invalid[name='name']").fill("Harsha");
    await page.locator(".ng-invalid[name='email']").fill("test@gmail.com");
    await page.getByPlaceholder("Password").fill("abc1234");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.locator("input[type='date']").fill("2025-06-08");
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByAltText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link", { name: 'Shop' }).click();
    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();

})
