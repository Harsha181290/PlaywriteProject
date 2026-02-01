import { Page ,Locator} from "@playwright/test";

export class CheckoutPage {

    page:Page;
    CheckoutButton:Locator;
    productHeading:Locator;
    submitButton:Locator;
    constructor(page:Page) {
        this.page = page;
        this.CheckoutButton = page.locator("text=Checkout");
        this.productHeading = page.locator('h3');
        this.submitButton = page.locator(".action__submit");

    }

    async isProductVisible(productName:string) {
        const product = this.page.locator('h3', { hasText: productName });
        return true;
    }
    async clickCheckout() {
        await this.CheckoutButton.click();
    }

    async CheckoutMakepayment(cvv:string, name:string, countrycode:string, country:string) {

        await this.page.locator(".input[type='text']").nth(1).fill(cvv);
        await this.page.locator(".input[type='text']").nth(2).fill(name);

        await this.page.locator("[placeholder*='Country']").pressSequentially(countrycode);
        const dropdown = this.page.locator(".ta-results");
        await dropdown.waitFor();
        const optionscount = await dropdown.locator("button").count();
        for (let i = 0; i < optionscount; i++) {

            const text = await dropdown.locator("button").nth(i).textContent();
            if (text == country) {

                await dropdown.locator("button").nth(i).click();
                break;
            }
        }
        await this.submitButton.click();

    }
    getLoggedInUserLabel() {
  return this.page.locator('.user__name label');
}
}
module.exports = { CheckoutPage };