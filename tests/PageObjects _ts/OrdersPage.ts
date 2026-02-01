import { Locator, Page } from "@playwright/test";

const { expect } = require('@playwright/test');
export class OrdersPage {
     page : Page;
     orderMessage:Locator;
      orderId:Locator;
      myOrdersLink:Locator;
      ordersTableRows:Locator;
    constructor(page: Page) {
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
    return (await this.orderId.textContent())?.trim() ?? "";
  }
  
   async ValidateOrderPlaced(orderId: string) {
    await this.myOrdersLink.first().click();
    await this.ordersTableRows.first().waitFor();

    const ordersCount = await this.ordersTableRows.count();
    const Orders = this.page.locator("tr.ng-star-inserted");
    for (let i = 0; i < ordersCount; i++) {
      const orderidtext : string = (await Orders.locator("th").nth(i).textContent()) ?? "";
      if (orderId.includes(orderidtext.trim())) {
        
        await Orders.locator("td").locator("button").first().click();
        break;
      }
    }
  }

async getOrderIdDetails() {
  return (await this.page.locator(".col-text").textContent())?.trim() ?? "";
}
}
module.exports ={OrdersPage};