const { test, expect } = require('@playwright/test');
test("AddProducttoCart", async ({ page }) => {
  const productname = "ZARA COAT 3";
  const email = "harsha123145@gmail.com";
  const password = "Harsha@2025";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill(password);
  await page.getByRole("button", { name: 'Login' }).click();
   await page.waitForResponse(response =>
        response.url().includes("/api/ecom/auth/login") &&
        response.status() === 200
    );
  //await page.waitForLoadState("networkidle");
  //await page.locator(".card-body b").first().waitFor();

  await page.locator(".card-body").filter({ hasText: productname }).getByRole("button", { name: ' Add To Cart' }).click();

  await page.getByRole("listitem").getByRole("button", { name: 'Cart' }).click();
  await page.locator("div li").first().waitFor();

  await expect(page.getByText(productname)).toBeVisible();

  await page.getByRole("button", { name: 'Checkout' }).click();
  await page.locator(".input[type='text']").nth(1).fill("123");
  await page.locator(".input[type='text']").nth(2).fill("harsha");

  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.getByRole("button", { name: 'India' }).nth(1).click();

  await page.getByText("PLACE ORDER").click();
  await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
  const orderIdElement = await page.getByText(/\|\s*[a-f0-9]{24}\s*\|/i);
  const orderIdText = await orderIdElement.textContent();

  const orderId = orderIdText?.replace(/\|/g, '').trim();
  await page.getByRole("listitem").getByRole("button", { name: 'ORDERS' }).click();

  await page.locator(".ng-star-inserted tr").first().waitFor();

  const table = await page.getByRole('table');
  const rows = await table.getByRole('row');


  const rowCount = await rows.count();

  for (let i = 1; i < rowCount; i++) { // skip header row
    const row = rows.nth(i);

    // Get Order ID from rowheader
    const orderIdHeader = await row.getByRole('rowheader');
    const orderIdText = await orderIdHeader.textContent();

    if (orderIdText?.includes(orderId)) {
      console.log('Matched Order ID:', orderIdText.trim());

      // Optionally, click "View" in this row
      await row.getByRole('button', { name: 'View' }).click();
      expect(orderId.includes(orderIdText)).toBeTruthy();
      break;
    }
  }







})