//Author : Harsha
const { test, expect } = require('@playwright/test');

test("Login and verify Iphone X product on shop page", async ({ page }) => {
    // Step 1: Navigate to login page
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    
    // Step 2: Enter username
    await page.locator("#username").fill("rahulshettyacademy");
    
    // Step 3: Enter password
    await page.locator("#password").fill("Learning@830$3mK2");
    
    // Step 4: Select checkbox for terms and conditions
    await page.locator("input[type='checkbox']").click();
    
    // Step 5: Click Sign In button
    await page.locator("#signInBtn").click();
    
    // Step 6: Wait until page navigates to shop page
    await page.waitForURL("**/angularpractice/shop");
    
    // Step 7: Verify page title or URL
    const currentUrl = page.url();
    expect(currentUrl).toContain("angularpractice/shop");
    
    // Step 8: Verify Iphone X is present on the products page
    const iphoneProduct = page.locator("h4").filter({ hasText: "iphone X" });
    await expect(iphoneProduct).toBeVisible();
    
    console.log("✓ Successfully navigated to shop page");
    console.log("✓ Iphone X product is present on the products page");
});
