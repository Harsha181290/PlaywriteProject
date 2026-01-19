const { test, expect } = require('@playwright/test');
let WebContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("harsha935383@gmail.com");
    await page.locator("#userPassword").fill("Harsha@2025");
    await page.locator("#login").click();
    await page.waitForResponse(response =>
        response.url().includes("/api/ecom/auth/login") &&
        response.status() === 200
    );

    await context.storageState({ path: "state.json" });

    WebContext = await browser.newContext({ storageState: "state.json" });

})


test(" @API AddProducttoCart", async () => {
    const productname = "ZARA COAT 3";
    const page = await WebContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".card-body").first().waitFor();
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; i++) {

        if (await products.nth(i).locator("b").textContent() === productname) {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator(".input[type='text']").nth(1).fill("123");
    await page.locator(".input[type='text']").nth(2).fill("harsha");

    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionscount = await dropdown.locator("button").count();
    for (let i = 0; i < optionscount; i++) {

        const text = await dropdown.locator("button").nth(i).textContent();
        if (text == " India") {

            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText("harsha935383@gmail.com");
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator(".ng-star-inserted tr").first().waitFor();
    const Orders = page.locator("tr.ng-star-inserted");
    const Orderscount = await page.locator("tr.ng-star-inserted").count();
    for (let i = 0; i < Orderscount; i++) {

        const orderidtext = await Orders.locator("th").nth(i).textContent();
        if (orderid.includes(orderidtext)) {
            await Orders.locator("td").locator("button").first().click();
            break;
        }

    }

    const orderiddetails = await page.locator(".col-text").textContent();
    expect(orderid.includes(orderiddetails)).toBeTruthy();
})
test("@API Test Case 2", async () => {
    const productname = "ZARA COAT 3";
    const page = await WebContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".card-body").first().waitFor();
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
})