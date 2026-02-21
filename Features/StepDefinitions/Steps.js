const { When, Then, Given } = require('@cucumber/cucumber')
const { expect} = require('@playwright/test');
const Playwright = require('@playwright/test');
const { POManager } = require('../../tests/PageObjects/POManager');
Given('User navigates to {string}', {timeout: 100*1000} ,async function (URL) {

    this.browser = await Playwright.chromium.launch({ headless: true });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    this.poManager = new POManager(this.page);

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

When('a {string} enters the {string} and {string} and {string} and {string} Order is placed',{timeout: 100*1000} ,async function (username, cvv,cardname, countrycode, country) {
    
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