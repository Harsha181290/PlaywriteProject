import test, { expect } from "@playwright/test";
import { POManager } from "./PageObjects _ts/POManager";

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
    await expect(checkout.getLoggedInUserLabel()).toHaveText(data.username);
    await checkout.CheckoutMakepayment(data.cvv,data.name,data.countrycode,data.country);
    await expect(orderspage.getOrderMessage()).toHaveText(data.validationmessage);
    const orderid = await orderspage.getOrderId();
    await orderspage.ValidateOrderPlaced(orderid);
    const orderIdDetails = await orderspage.getOrderIdDetails();
    expect(orderid.includes(orderIdDetails)).toBeTruthy();
})
}
