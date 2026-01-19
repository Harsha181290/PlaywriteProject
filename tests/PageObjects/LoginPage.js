class LoginPage {

    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.Password = page.locator("#userPassword");
    }

    async goTo(url) {

        await this.page.goto(url);
    }

    async ValidLogin(username, password) {
        await this.userName.fill(username);
        await this.Password.fill(password);

        await Promise.all([
            this.page.waitForResponse(response =>
                response.url().includes('/api/ecom/auth/login') &&
                response.status() === 200
            ),
            this.signInButton.click(),
        ]);
    }

}
module.exports = { LoginPage };