const{LoginPage}= require('./LoginPage');
const{DashboardPage}= require('./DashboardPage');
const{CheckoutPage}= require('./CheckoutPage');
const{OrdersPage}= require('./OrdersPage');
class POManager {

    constructor(page) {
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