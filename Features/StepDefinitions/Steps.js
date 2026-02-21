const { When, Then, Given } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test');

Given('User navigates to {string}', { timeout: 100 * 1000 }, async function (URL) {
    const loginpage = this.poManager.getLoginPage();
    await loginpage.goTo(URL);
});
Then('User logins into ecomercesite with {string} and {string}',
    async function (username, password) {

        const loginpage = this.poManager.getLoginPage();
        await loginpage.ValidLogin(username, password);
    });
When('User adds {string} to cart', async function (productname) {

    const dashboard = this.poManager.getDashboardPage();
    await dashboard.SearchProductAddtoCart(productname);
    await dashboard.NavigateToCart();
});
Then('User should be able to see {string} in Cart', async function (productname) {

    const checkout = this.poManager.getCheckoutPage();
    await checkout.isProductVisible(productname);

});

When('a {string} enters the {string} and {string} and {string} and {string} Order is placed', { timeout: 100 * 1000 }, async function (username, cvv, cardname, countrycode, country) {

    const checkout = this.poManager.getCheckoutPage();
    await checkout.clickCheckout();
    await expect(checkout.getUsernameInput()).toHaveText(username);
    await checkout.CheckoutMakepayment(cvv, cardname, countrycode, country);
});
Then('a {string} is displayed and order id is generated', async function (successmessage) {

    const orderspage = this.poManager.getOrdersPage();
    await expect(orderspage.getOrderMessage()).toHaveText(successmessage);

});
Then('Verify whether the order is placed in order history page', async function () {

    const orderspage = this.poManager.getOrdersPage();
    const orderid = await orderspage.getOrderId();
    await orderspage.ValidateOrderPlaced(orderid);
    const orderIdDetails = await orderspage.getOrderIdDetails();
    expect(orderid.includes(orderIdDetails)).toBeTruthy();
});
Given('a user logins to eccomers2 application with invalid {string} and {string}', async function (username, password) {
    const usernameInput = this.page.locator("#username");
    const passwordInput = this.page.locator("[type='password']");
    const sigin = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await sigin.click();
});
Then('Verify Error message is displayed', async function () {

    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});
