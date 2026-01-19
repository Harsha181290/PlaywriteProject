
class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.CheckoutButton = page.locator("text=Checkout");
        this.productHeading = page.locator('h3');
        this.usernameText = page.locator(".user__name label");
        this.submitButton = page.locator(".action__submit");

    }

    async isProductVisible(productName) {
        const product = this.page.locator('h3', { hasText: productName });
        return true;
    }
    async clickCheckout() {
        await this.CheckoutButton.click();
    }

    async CheckoutMakepayment(cvv, name, countrycode, country) {

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
    getUsernameInput() {
        return this.usernameText;
    }
}
module.exports = { CheckoutPage };