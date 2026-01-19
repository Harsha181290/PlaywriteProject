const { test, expect } = require('@playwright/test');
test("Registration and Login", async ({ page }) => {
    const randomEmail = `harsha${Math.floor(Math.random() * 1000000)}@gmail.com`;
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".text-reset").click();
    await page.locator("#firstName").fill("Harsha");
    await page.locator("#lastName").fill("varma");
    await page.locator("#userEmail").fill(randomEmail);
    await page.locator("#userMobile").fill("9550059279");
    await page.selectOption("[formcontrolname='occupation']", "Doctor");
    await page.locator("[value='Male']").click();
    await page.locator("#userPassword").fill("Harsha@2025");
    await page.locator("#confirmPassword").fill("Harsha@2025");
    await page.locator("[formcontrolname='required']").click();
    await page.locator("[value='Register']").click();
    await expect(page.locator("text='Account Created Successfully'")).toContainText("Successfully");
    await page.locator("text='Login'").click();
    await page.locator("#userEmail").fill(randomEmail);
    await page.locator("#userPassword").fill("Harsha@2025");
    await page.locator("#login").click();

})

test.skip("AddProducttoCart", async ({ page }) => {
    const productname = "ZARA COAT 3";
    const email = "harsha935383@gmail.com";
    const password = "Harsha@2025";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill(password);
    await page.locator("#login").click();
   // await page.waitForLoadState("networkidle");
    
    //await page.locator(".card-body b").first().waitFor();
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

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
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
