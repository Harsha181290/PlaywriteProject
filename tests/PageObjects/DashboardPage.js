class DashboardPage
{

    constructor(page)
    {
        this.Products = page.locator(".card-body");
        this.ProductsText= page.locator(".card-body b");
        this.Cart = page.locator("[routerlink*='cart']");

    }

  async  SearchProductAddtoCart(productName)
    {
        
            const titles = await this.ProductsText.allTextContents();
            console.log(titles);
            const count = await this.Products.count();
            for (let i = 0; i < count; i++) {
        
                if (await this.Products.nth(i).locator("b").textContent() === productName) {
                    await this.Products.nth(i).locator("text= Add To Cart").click();
                    break;
                }
            }

    }

    async NavigateToCart()
    {
       await this.Cart.click();
    }
}
module.exports={DashboardPage};