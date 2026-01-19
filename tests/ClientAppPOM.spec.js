const { test, expect } = require('@playwright/test');
const{POManager}= require('./PageObjects/POManager');
const dataset= JSON.parse(JSON.stringify(require('./Utils/PlaceOrderTestData.json')));
for(const data of dataset)
{   
test(`Client App login for ${data.product}`, async ({ page }) => {
    const poManager= new POManager(page);
    const loginpage= poManager.getLoginPage();
    const dashboard = poManager.getDashboardPage();
    const checkout = poManager.getCheckoutPage();
    const orderspage = poManager.getOrdersPage();
    await loginpage.goTo(data.url);
    await loginpage.ValidLogin(data.username,data.password);
    await dashboard.SearchProductAddtoCart(data.product);
    await dashboard.NavigateToCart();
    await checkout.isProductVisible(data.product);
    await checkout.clickCheckout();
    await checkout.CheckoutMakepayment(data.cvv,data.name,data.countrycode,data.country);
    await expect(checkout.getUsernameInput()).toHaveText(data.username);
    await expect(orderspage.getOrderMessage()).toHaveText(data.validationmessage);
    const orderid = await orderspage.getOrderId();
    await orderspage.ValidateOrderPlaced(orderid);
    const orderIdDetails = await orderspage.getOrderIdDetails();
    expect(orderid.includes(orderIdDetails)).toBeTuthy();
})
}
