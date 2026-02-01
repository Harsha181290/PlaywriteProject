import { Locator, Page } from "@playwright/test";

export class DashboardPage
{
    page:Page;
    Products:Locator;
    ProductsText:Locator;
    Cart:Locator;
    constructor(page:Page)
    {
        this.page = page;
        this.Products = page.locator(".card-body");
        this.ProductsText= page.locator(".card-body b");
        this.Cart = page.locator("[routerlink*='cart']");

    }

  async  SearchProductAddtoCart(productName:string)
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