const { expect } = require('@playwright/test');
class OrdersPage {
    constructor(page) {
        this.page = page;
        this.orderMessage = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrdersLink= page.locator("[routerlink*='myorders']");
        this.ordersTableRows= page.locator(".ng-star-inserted tr");

    }

   getOrderMessage() {
    return this.orderMessage;
  }
 async getOrderId() {
    return (await this.orderId.textContent()).trim();
  }
  
   async ValidateOrderPlaced(orderId) {
    await this.myOrdersLink.click();
    await this.ordersTableRows.first().waitFor();

    // Find and click the view button for the matching order ID
    const matchingRow = this.ordersTableRows.filter({
      has: this.page.locator("th"),
      hasText: orderId
    });

    if (await matchingRow.count() > 0) {
      await matchingRow.locator("button").first().click();
    } else {
      throw new Error(`Order ID "${orderId}" not found in orders table`);
    }
  }

async getOrderIdDetails() {
  return (await this.page.locator(".col-text").textContent()).trim();
}
}
module.exports ={OrdersPage};