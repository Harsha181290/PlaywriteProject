import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrdersPage } from "./OrdersPage";
import { Page } from "@playwright/test";
export class POManager {

     page: Page;
     loginpage:LoginPage;
     dashboardpage:DashboardPage;
     CheckoutPage:CheckoutPage;
     OrdersPage:OrdersPage;   
    constructor(page:Page) {
        this.page = page;
        this.loginpage = new LoginPage(page);
        this.dashboardpage = new DashboardPage(page);
        this.CheckoutPage = new CheckoutPage(page);
        this.OrdersPage = new OrdersPage(page);
    }

    getLoginPage()
    {
        return this.loginpage;
    }

    getDashboardPage()
    {
        return this.dashboardpage;
    }

    getCheckoutPage()
    {
        return this.CheckoutPage;
    }

    getOrdersPage()
    {
        return this.OrdersPage;
    }
}
module.exports= {POManager};