//Author : Harsha
const { CustomTest } = require('./Utils/test-base');
const {expect } = require('@playwright/test');
const{POManager}= require('./PageObjects/POManager');

CustomTest.skip("Client App Login ", async ({ page,testdataforplaceorder }) => {
    const poManager = new POManager(page);
    const loginpage= poManager.getLoginPage();
    const dashboard = poManager.getDashboardPage();
    const checkout = poManager.getCheckoutPage();
    const orderspage = poManager.getOrdersPage();
    await loginpage.goTo(testdataforplaceorder.url);
    await loginpage.ValidLogin(testdataforplaceorder.username,testdataforplaceorder.password);
    await dashboard.SearchProductAddtoCart(testdataforplaceorder.product);
    await dashboard.NavigateToCart();
    await checkout.isProductVisible(testdataforplaceorder.product);
    await checkout.clickCheckout();
    await checkout.CheckoutMakepayment(testdataforplaceorder.cvv,testdataforplaceorder.name,testdataforplaceorder.countrycode,testdataforplaceorder.country);
    await expect(checkout.getUsernameInput()).toHaveText(testdataforplaceorder.username);
    await expect(orderspage.getOrderMessage()).toHaveText(testdataforplaceorder.validationmessage);
    const orderid = await orderspage.getOrderId();
    await orderspage.ValidateOrderPlaced(orderid);
    const orderIdDetails = await orderspage.getOrderIdDetails();
    expect(orderid.includes(orderIdDetails)).toBeTruthy();
})

