const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./Utils/APIUtils');
const loginPayLoad = { "userEmail": "harsha935383@gmail.com", "userPassword": "Harsha@2025" };
const FakePayloadOrders = { data: [], message: "No Orders" };


let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    const prouctid = await apiUtils.getProduct();
    const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: prouctid }] };

    response = await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('@API Place the order', async ({ page }) => {
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {

            const respnse = await page.request.fetch(route.request());
            let body = JSON.stringify(FakePayloadOrders);
            route.fulfill({
                respnse,
                body,
            });
        }
    );

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator(".mt-4").textContent());


});